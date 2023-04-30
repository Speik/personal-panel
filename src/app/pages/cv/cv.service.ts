import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { ICv } from './cv.model';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  public constructor(private http: HttpClient) {}

  public getCv(): Observable<ICv> {
    return this.http.get<ICv>('cv').pipe(share());
  }

  public updateCv(cv: Partial<ICv>): Observable<Object> {
    return this.http.post(`cv`, cv).pipe(share());
  }
}
