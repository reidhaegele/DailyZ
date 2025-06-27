import { Component, inject } from '@angular/core';
import { UserManager } from '../../services/user/user-manager';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  userManager = inject(UserManager);
  user$ = this.userManager.user$;
}
