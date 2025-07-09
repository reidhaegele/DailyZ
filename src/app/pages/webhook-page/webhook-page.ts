import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DocumentData, serverTimestamp } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserManager } from '../../services/user/user-manager';
import { paths } from '../../enums/paths.enum'

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
  path = paths.daily;
  startDate = serverTimestamp();
  frequency = 1; // 1 is daily, 2 is every other day, 7 is weekly
  //lastRun, Status

  sendTextWebhook() {
    this.userManager.saveTextWebhook(this.name, this.url, this.path, this.startDate, this.frequency);
    this.name = '';
    this.url = '';
    this.path = paths.daily;
    this.startDate = serverTimestamp();
  }

  deleteWebhook(docID: string) {
    this.userManager.deleteData(docID);
  }

  hello(wh: DocumentData) {
    console.log("Hello Reid!", wh);
  }
  // uploadImage(event: any) {
  //   const imgFile: File = event.target.files[0];
  //   if (!imgFile) {
  //     return;
  //   }
  //   this.userManager.saveImageWebhook(imgFile);
  // }
}
