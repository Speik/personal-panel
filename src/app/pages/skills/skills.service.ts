import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { ISkill } from './skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  constructor(private http: HttpClient) {}

  public getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>('skills').pipe(share());
  }
}
