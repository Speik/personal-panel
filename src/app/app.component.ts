import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { AuthService } from './auth/auth.service';
import { PreconnectService } from './http/preconnect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterContentChecked {
  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private preconnectService: PreconnectService,
    public auth: AuthService
  ) {}

  public ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.preconnectService.preconnect();
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
