import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreconnectService {
  public readonly isLoaded$ = new BehaviorSubject<boolean>(false);

  public constructor(private http: HttpClient) {}

  public preconnect(): void {
    this.http
      .get('preconnect')
      /**
       * Artificial delay to allow csrf token in cookies keep up
       *
       * Looks like crutch? Yes. Should I fix this in the other way? Yes.
       * Does I want this to be fixed after two days of suffering? No :D
       */
      .pipe(delay(100))
      .subscribe(() => {
        this.isLoaded$.next(true);
      });
  }
}
