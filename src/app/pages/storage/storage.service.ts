import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { IStorageItem } from './storage.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  public getFiles(): Observable<IStorageItem[]> {
    return this.http.get<IStorageItem[]>('storage').pipe(share());
  }

  public getImages(): Observable<IStorageItem[]> {
    return this.http.get<IStorageItem[]>('storage/images').pipe(share());
  }

  public deleteFile(file: IStorageItem): Observable<Object> {
    const { id } = file;
    return this.http.delete(`storage/${id}`).pipe(share());
  }
}
