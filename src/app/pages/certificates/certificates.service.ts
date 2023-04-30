import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { ICertificate } from './certificates.model';

@Injectable({
  providedIn: 'root',
})
export class CertificatesService {
  public constructor(private http: HttpClient) {}

  public getCertificates(): Observable<ICertificate[]> {
    return this.http.get<ICertificate[]>('certificates').pipe(share());
  }

  public createCertificate(certificate: ICertificate): Observable<Object> {
    return this.http.post('certificates', certificate).pipe(share());
  }

  public updateCertificate(
    id: string,
    certificate: ICertificate
  ): Observable<Object> {
    return this.http.patch(`certificates/${id}`, certificate).pipe(share());
  }

  public deleteCertificate(certificate: ICertificate): Observable<Object> {
    const { id } = certificate;
    return this.http.delete(`certificates/${id}`).pipe(share());
  }
}
