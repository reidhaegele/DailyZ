import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserManager } from '../../services/user/user-manager';

@Component({
  selector: 'app-webhook-page',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './webhook-page.html',
  styleUrl: './webhook-page.scss'
})
export class WebhookPage {
  userManager = inject(UserManager);
  webhooks$ = this.userManager.loadWebhooks() as Observable<DocumentData[]>;
  user$ = this.userManager.user$;
  name = '';
  url = '';
  daily = false;
  neetcode150 = -1;

  sendTextWebhook() {
    this.userManager.saveTextWebhook(this.name, this.url, this.daily, this.neetcode150);
    this.name = '';
    this.url = '';
    this.daily = false;
    this.neetcode150 = -1;
  }

  deleteWebhook(docID: string) {
    this.userManager.deleteData(docID)
  }

  hello(wh: DocumentData) {
    console.log("Hello Reid!", wh)
  }
  // uploadImage(event: any) {
  //   const imgFile: File = event.target.files[0];
  //   if (!imgFile) {
  //     return;
  //   }
  //   this.userManager.saveImageWebhook(imgFile);
  // }
}
