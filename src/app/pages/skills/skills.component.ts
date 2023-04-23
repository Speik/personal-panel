import { AfterViewInit, Component } from '@angular/core';
import { SkillsService } from './skills.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  public isLoading = true;

  constructor(private skillsService: SkillsService) {}

  public ngAfterViewInit(): void {
    this.skillsService.getSkills().subscribe((result) => {
      console.log(result);
      this.isLoading = false;
    });
  }
}
