import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { SkillsService } from './skills.service';
import { ISkill } from './skills.model';

type EditForm = {
  id: Nullable<string>;
  form: FormGroup;
};

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  public isLoading = false;
  public isCreationVisible = false;
  public skillsData: ISkill[] = [...new Array(6)];

  public skillCreationForm = this.fb.group({
    name: ['', [Validators.required]],
    proficiency: [0, [Validators.required]],
  });

  public skillEdit: EditForm = {
    id: null,
    form: this.fb.group({
      name: ['', [Validators.required]],
      proficiency: [0, [Validators.required]],
    }),
  };

  constructor(
    private fb: FormBuilder,
    private skillsService: SkillsService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getSkills();
  }

  public toggleCreationForm(): void {
    this.isCreationVisible = !this.isCreationVisible;
  }

  public confirmDelete(event: Event, skill: ISkill): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete skill ${skill.name}?`,
      target: event.target!,
      accept: this.deleteSkill.bind(this, skill),
    });
  }

  public handleCreateSkill(): void {
    if (!this.skillCreationForm.valid) {
      return;
    }

    const [name, proficiency] = [
      this.skillCreationForm.controls.name.value ?? '',
      Number(this.skillCreationForm.controls.proficiency.value) ?? 0,
    ];

    this.skillCreationForm.reset();
    this.isCreationVisible = false;

    this.skillsService.createSkill({ name, proficiency }).subscribe(() => {
      this.getSkills();
    });
  }

  public showEditSkill(skill: ISkill): void {
    if (!skill) return;

    const controls = this.skillEdit.form.controls;

    this.skillEdit.id = skill.id!;
    controls?.['name'].setValue(skill.name);
    controls?.['proficiency'].setValue(skill.proficiency);
  }

  public hideEditForm(): void {
    this.skillEdit.id = null;
    this.skillEdit.form.reset();
  }

  public handleEditSkill(): void {
    if (!this.skillEdit.form.valid) {
      return;
    }

    const [id, name, proficiency] = [
      this.skillEdit.id ?? '',
      this.skillEdit.form.controls?.['name'].value ?? '',
      Number(this.skillEdit.form.controls?.['proficiency'].value) ?? 0,
    ];

    this.hideEditForm();

    this.skillsService.updateSkill(id, { name, proficiency }).subscribe(() => {
      this.getSkills();
    });
  }

  private deleteSkill(skill: ISkill): void {
    this.skillsService.deleteSkill(skill).subscribe(() => {
      this.getSkills();
    });
  }

  private getSkills(): void {
    this.isLoading = true;

    this.skillsService.getSkills().subscribe((skills) => {
      this.skillsData = skills;
      this.isLoading = false;
    });
  }
}
