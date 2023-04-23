import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    public auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public ngAfterContentChecked(): void {
    const isAuthenticated = this.auth.isAuthenticated;
    const isOnLoginPage = this.router.url === '/login';

    if (!isAuthenticated && !isOnLoginPage) {
      this.router.navigateByUrl('/login');
    }

    if (isAuthenticated && isOnLoginPage) {
      this.router.navigateByUrl('/');
    }
  }
}
