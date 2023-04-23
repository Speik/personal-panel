import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { IAuthorizedUser, LoginPayload } from './auth.model';

const LOCAL_STORAGE_USER_KEY = 'authorizedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  public login(payload: LoginPayload): Observable<IAuthorizedUser> {
    return this.http.post<IAuthorizedUser>('users/login', payload).pipe(
      tap((user) => {
        console.log(user);

        this.setAuthorizedUser(user);
      }),
      catchError((error) => {
        console.log(error);
        return of(error);
      })
    );
  }

  public get authorizedUser(): IAuthorizedUser {
    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (!userJson) {
      throw new Error('Error while getting authorized user');
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
