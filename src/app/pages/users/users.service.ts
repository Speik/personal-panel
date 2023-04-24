import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { IUser } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('users').pipe(share());
  }

  public createUser(user: IUser): Observable<Object> {
    return this.http.post('users/signup', user).pipe(share());
  }

  public updateUser(id: string, user: IUser): Observable<Object> {
    return this.http.patch(`users/${id}`, user).pipe(share());
  }

  public deleteUser(user: IUser): Observable<Object> {
    const { id } = user;
    return this.http.delete(`users/${id}`).pipe(share());
  }
}
