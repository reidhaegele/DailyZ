import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserManager } from '../../services/user-manager';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  userManager = inject(UserManager);
  user$ = this.userManager.user$;
}
