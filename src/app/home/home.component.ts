import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Account } from '../model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
      user: Account;

      LOGOUT_URL = environment.logout;

      constructor(@Inject(DOCUMENT) private document: any,
                  private authService: AuthService) {}

      ngOnInit() {
          this.authService.checkAccount().subscribe((data: Account) => this.user=data);
      }

      logout() {
        const url = (window as any).location.href;
        const domain = this.authService.extractHostname(url);
        const cookie = `return-url=${encodeURIComponent(url)};domain=${domain};path=/;`
        const expire = ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        this.document.cookie = cookie + expire;
        this.document.location.href = this.LOGOUT_URL;
      }
}
