import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share, tap } from 'rxjs';

import { IAuthorizedUser, LoginPayload } from './auth.model';

const LOCAL_STORAGE_USER_KEY = 'authorizedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.isAuthenticated = Boolean(this.authorizedUser);
  }

  public login(payload: LoginPayload): Observable<IAuthorizedUser> {
    return this.http.post<IAuthorizedUser>('users/login', payload).pipe(
      tap((user) => {
        this.setAuthorizedUser(user);
      }),
      share()
    );
  }

  public get authorizedUser(): Nullable<IAuthorizedUser> {
    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
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
