import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

import { ISkill } from './skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  public constructor(private http: HttpClient) {}

  public getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>('skills').pipe(share());
  }

  public createSkill(skill: ISkill): Observable<Object> {
    return this.http.post('skills', skill).pipe(share());
  }

  public updateSkill(id: string, skill: ISkill): Observable<Object> {
    return this.http.patch(`skills/${id}`, skill).pipe(share());
  }

  public deleteSkill(skill: ISkill): Observable<Object> {
    const { id } = skill;
    return this.http.delete(`skills/${id}`).pipe(share());
  }
}
