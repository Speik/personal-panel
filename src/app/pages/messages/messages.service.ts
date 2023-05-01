import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { IClientMessage } from './messages.model';

@Injectable({
  providedIn: 'root',
})
export class ClientMessagesService {
  public constructor(private http: HttpClient) {}

  public getMessages(): Observable<IClientMessage[]> {
    return this.http.get<IClientMessage[]>('messages').pipe(share());
  }

  public deleteMessage(message: IClientMessage): Observable<Object> {
    const { id } = message;
    return this.http.delete(`messages/${id}`).pipe(share());
  }
}
