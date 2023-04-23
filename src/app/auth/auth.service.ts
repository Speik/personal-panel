import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { IAuthorizedUser, LoginPayload } from './auth.model';
import { NotificationsService } from '../notifications/notifications.service';

const LOCAL_STORAGE_USER_KEY = 'authorizedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  public login(payload: LoginPayload): Observable<IAuthorizedUser> {
    return this.http.post<IAuthorizedUser>('users/login', payload).pipe(
      tap((user) => {
        this.setAuthorizedUser(user);
      }),
      catchError((error) => {
        this.notificationsService.httpError({
          message: error.error.message,
        });

        return of(error);
      })
    );
  }

  public get authorizedUser(): IAuthorizedUser {
    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (!userJson) {
      const errorMessage = 'Error while getting authorized user';

      this.notificationsService.error({
        title: 'Unknown error',
        message: errorMessage,
      });

      throw new Error(errorMessage);
    }

    return JSON.parse(userJson);
  }

  public logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  }

  private setAuthorizedUser(user: IAuthorizedUser): void {
    this.isAuthenticated = true;
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  }
}
