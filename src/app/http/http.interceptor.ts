import { Injectable } from '@angular/core';
import { HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable, catchError, of, switchMap, filter } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { AuthService } from '../auth/auth.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PreconnectService } from './preconnect.service';

@Injectable()
export class PrimaryHttpInterceptor implements HttpInterceptor {
  public constructor(
    private auth: AuthService,
    private notificationsService: NotificationsService,
    private preconnectService: PreconnectService,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  public intercept(
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isPreconnect = originalRequest.url === 'preconnect';

    /**
     * Do not wait for loading if current request
     * is 'preconnect' request itself
     */
    if (isPreconnect) {
      return this.handle(originalRequest, next);
    }

    return this.preconnectService.isLoaded$.pipe(
      filter((status) => status),
      switchMap(this.handle.bind(this, originalRequest, next))
    );
  }

  private handle(
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const extendedRequest = this.setupRequest(originalRequest);

    return next
      .handle(extendedRequest)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private setupRequest(originalRequest: HttpRequest<any>): HttpRequest<any> {
    const requestUrl = `${environment.baseApiUrl}/${originalRequest.url}`;
    const token = this.tokenExtractor.getToken();

    return originalRequest.clone({
      url: requestUrl,
      withCredentials: true,
      headers: new HttpHeaders({
        Authorization: this.auth.authorizedUser?.access_token ?? '',
        [environment.csrfHeaderName]: token ?? '',
      }),
    });
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 401) {
      this.auth.logout();
    }

    console.error(error);

    this.notificationsService.httpError({
      message: error.error.message ?? error.message,
    });

    return of(error);
  }
}
