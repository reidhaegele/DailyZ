import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  getAuth,
  User,
} from '@angular/fire/auth';
import {
  doc,
  docData,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  collectionData,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  DocumentData,
  FieldValue,
} from '@angular/fire/firestore';
import { map, switchMap, firstValueFrom, filter, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

type Webhook = {
  user: string | null,
  name?: string | null,
  url?: string | null,
  timestamp: FieldValue,
  last_run?: FieldValue | null,
  last_run_status?: string | null,
  next_run?: FieldValue | null,
  uid: string | null
};

@Injectable({
  providedIn: 'root'
})
export class UserManager {

  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  router: Router = inject(Router);
  private provider = new GoogleAuthProvider();
  LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

  // observable that is updated when the auth state changes
  user$ = user(this.auth);
  currentUser: User | null = this.auth.currentUser;
  userSubscription: Subscription;

  constructor() {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      this.currentUser = aUser;
  });
  }

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.router.navigate(['/', 'webhook']);
        return credential;
    })
  }

  logout() {
    signOut(this.auth).then(() => {
        this.router.navigate(['/', 'login'])
        console.log('signed out');
    }).catch((error) => {
        console.log('sign out error: ' + error);
    })
  }

  // Adds a text or image webhook to Cloud Firestore.
  addWebhook = async (
    name: string | null,
    url: string | null,
  ): Promise<void | DocumentReference<DocumentData>> => {
    // ignore empty webhooks
    if (!url && !name) {
      console.log(
        "addWebhook was called without a webhook name or url",
        url,
        name,
      );
      return;
    }
  
    if (this.currentUser === null) {
      console.log("addWebhook requires a signed-in user");
      return;
    }
  
    const webhook: Webhook = {
      timestamp: serverTimestamp(),
      uid: this.currentUser?.uid,
      user: this.currentUser.displayName,
    };
  
    url && (webhook.url = url); //if url is not null, assign webhook.url to url
    name && (webhook.name = name);
  
    try {
      const newWebhookRef = await addDoc(
        collection(this.firestore, 'webhooks'),
        webhook,
      );
      return newWebhookRef;
    } catch (error) {
      console.error("Error writing new webhook to Firebase Database", error);
      return;
    }
  };

  // Saves a new webhook to Cloud Firestore.
  saveTextWebhook = async (webhookText: string, webhookUrl: string) => {
    return this.addWebhook(webhookText, webhookUrl);
  };

  // Loads chat webhooks history and listens for upcoming ones.
  loadWebhooks = () => {
    const recentWebhooksQuery = query(collection(this.firestore, 'webhooks'), orderBy('timestamp', 'desc'), limit(12));
    // Start listening to the query.
    return collectionData(recentWebhooksQuery);
  }

  // Saves a new webhook containing an image in Firebase.
  // This first saves the image in Firebase storage.
  saveImageWebhook = async (file: any) => {};

  async updateData(path: string, data: any) {}

  async deleteData(path: string) {}

  getDocData(path: string) {}

  getCollectionData(path: string) {}

  async uploadToStorage(
    path: string,
    input: HTMLInputElement,
    contentType: any
  ) {
    return null;
  }
  // Requests permissions to show notifications.
  requestNotificationsPermissions = async () => {};

  saveMessagingDeviceToken = async () => {};

}
