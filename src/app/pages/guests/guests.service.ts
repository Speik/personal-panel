import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { IGuest } from './guests.model';

@Injectable({
  providedIn: 'root',
})
export class GuestsService {
  public constructor(private http: HttpClient) {}

  public getGuests(): Observable<IGuest[]> {
    return this.http.get<IGuest[]>('guests').pipe(share());
  }
}
