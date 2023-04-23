import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class PrimaryInterceptor implements HttpInterceptor {
  private apiBaseUrl = process.env.NG_APP_API_URL;
  private csrfToken = process.env.NG_APP_CSRF_TOKEN;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: `${this.apiBaseUrl}/${req.url}`,
      headers: new HttpHeaders({
        'x-csrf-token': this.csrfToken,
      }),
    });

    return next.handle(apiReq);
  }
}
