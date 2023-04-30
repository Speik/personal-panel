import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PrimaryHttpInterceptor implements HttpInterceptor {
  private apiBaseUrl = process.env.NG_APP_API_URL;
  private csrfToken = process.env.NG_APP_CSRF_TOKEN;

  constructor(
    private auth: AuthService,
    private notificationsService: NotificationsService
  ) {}

  public intercept(
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiUrl = `${this.apiBaseUrl}/${originalRequest.url}`;

    const headers = new HttpHeaders({
      Authorization: this.auth.authorizedUser?.access_token ?? '',
      'x-csrf-token': this.csrfToken,
    });

    const extendedRequest = originalRequest.clone({
      url: apiUrl,
      headers,
    });

    return next.handle(extendedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.auth.logout();
        }

        console.error(error);

        this.notificationsService.httpError({
          message: error.error.message,
        });

        return of(error);
      })
    );
  }
}
