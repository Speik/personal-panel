import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, share } from 'rxjs';
import { IJourney } from './journey.model';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  public constructor(private http: HttpClient) {}

  public getJourneys(): Observable<IJourney[]> {
    return this.http.get<IJourney[]>('journey').pipe(share());
  }

  public createJourney(journey: IJourney): Observable<Object> {
    return this.http.post('journey', journey).pipe(share());
  }

  public updateJourney(id: string, journey: IJourney): Observable<Object> {
    return this.http.patch(`journey/${id}`, journey).pipe(share());
  }

  public deleteJourney(journey: IJourney): Observable<Object> {
    const { id } = journey;
    return this.http.delete(`journey/${id}`).pipe(share());
  }
}
