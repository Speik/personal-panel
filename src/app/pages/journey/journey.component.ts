import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { IJourney } from './journey.model';
import { JourneyService } from './journey.service';

type EditForm = {
  id: Nullable<string>;
  form: FormGroup;
};

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
})
export class JourneyComponent implements OnInit {
  public isLoading = false;
  public isCreationVisible = false;
  public journeysData: IJourney[] = [...new Array(6)];

  public journeyCreationForm = this.fb.group({
    employerName: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    shortDescription: ['', [Validators.required]],
    startedAt: [null, [Validators.required]],
    isPresent: true,
    endedAt: null,
    description: ['', [Validators.required]],
    skills: [],
  });

  public journeyEdit: EditForm = {
    id: null,
    form: this.fb.group({
      employerName: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      shortDescription: ['', [Validators.required]],
      startedAt: [null, [Validators.required]],
      isPresent: true,
      endedAt: null,
      description: ['', [Validators.required]],
      skills: [],
    }),
  };

  public constructor(
    private fb: FormBuilder,
    private journeyService: JourneyService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getJourneys();
  }

  public parseDescription(description: string): string {
    return description.trim().replaceAll('\n', '<br>');
  }

  public toggleCreationForm(): void {
    this.isCreationVisible = !this.isCreationVisible;
  }

  public confirmDelete(event: Event, journey: IJourney): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete journey ${journey.jobTitle}?`,
      target: event.target!,
      accept: this.deleteJourney.bind(this, journey),
    });
  }

  public handleCreateJourney(): void {
    if (!this.journeyCreationForm.valid) {
      return;
    }

    const controls = this.journeyCreationForm.controls;
    const isPresent = controls.isPresent.value;

    const startedAt = <Date>controls.startedAt.value!;
    const endedAt = isPresent ? null : <Date>controls.endedAt.value!;

    const newJourney: IJourney = {
      employerName: controls.employerName.value?.trim() ?? '',
      jobTitle: controls.jobTitle.value?.trim() ?? '',
      shortDescription: controls.shortDescription.value?.trim() ?? '',
      startedAt: startedAt,
      endedAt: endedAt,
      description: controls.description.value?.trim() ?? '',
      skills: <string[]>controls.skills.value! ?? [],
    };

    this.journeyCreationForm.reset();
    this.isCreationVisible = false;

    this.journeyService.createJourney(newJourney).subscribe(() => {
      this.getJourneys();
    });
  }

  public showEditJourney(journey: IJourney): void {
    if (!journey) return;

    const controls = this.journeyEdit.form.controls;

    this.journeyEdit.id = journey.id!;
    controls?.['employerName'].setValue(journey.employerName);
    controls?.['jobTitle'].setValue(journey.jobTitle);
    controls?.['shortDescription'].setValue(journey.shortDescription);
    controls?.['startedAt'].setValue(new Date(journey.startedAt));
    controls?.['endedAt'].setValue(
      journey.endedAt ? new Date(journey.endedAt) : null
    );
    controls?.['description'].setValue(journey.description);
    controls?.['skills'].setValue(journey.skills);

    if (!journey.endedAt) {
      controls?.['isPresent'].setValue(true);
    }
  }

  public hideEditForm(): void {
    this.journeyEdit.id = null;
    this.journeyEdit.form.reset();
  }

  public handleEditJourney(): void {
    if (!this.journeyEdit.form.valid) {
      return;
    }

    const id = this.journeyEdit.id!;
    const controls = this.journeyEdit.form.controls;
    const isPresent = <boolean>controls?.['isPresent'].value;

    const startedAt = <Date>controls?.['startedAt'].value;
    const endedAt = isPresent ? null : <Date>controls?.['endedAt'].value!;

    const updatedJourney: IJourney = {
      employerName: controls?.['employerName'].value?.trim() ?? '',
      jobTitle: controls?.['jobTitle'].value?.trim() ?? '',
      shortDescription: controls?.['shortDescription'].value?.trim() ?? '',
      startedAt: startedAt,
      endedAt: endedAt,
      description: controls?.['description'].value?.trim() ?? '',
      skills: <string[]>controls?.['skills'].value! ?? [],
    };

    this.hideEditForm();

    this.journeyService.updateJourney(id, updatedJourney).subscribe(() => {
      this.getJourneys();
    });
  }

  private deleteJourney(journey: IJourney): void {
    this.journeyService.deleteJourney(journey).subscribe(() => {
      this.getJourneys();
    });
  }

  private getJourneys(): void {
    this.isLoading = true;

    this.journeyService.getJourneys().subscribe((journeys) => {
      this.journeysData = journeys;
      this.isLoading = false;
    });
  }
}
