import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { zip } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IStorageItem } from '../storage/storage.model';
import { StorageService } from '../storage/storage.service';

import { ICv } from './cv.model';
import { CvService } from './cv.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
})
export class CvComponent implements OnInit {
  public isLoading = false;

  public storageData: IStorageItem[] = [];
  public currentCv: ICv = <ICv>{};

  public cvUpdateForm = this.fb.group({
    downloadFilename: ['', [Validators.required]],
    file: [<IStorageItem>{}, [Validators.required]],
  });

  public constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private cvService: CvService,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.fetchData();
  }

  public getFileUrl(filename: Optional<string>): string {
    if (!filename) return '';
    return `${environment.baseStorageUrl}/${filename}`;
  }

  public handleUpdateCv(): void {
    if (!this.cvUpdateForm.valid) {
      return;
    }

    const controls = this.cvUpdateForm.controls;

    const downloadFilename = controls?.['downloadFilename'].value?.trim() ?? '';
    const file = controls?.['file'].value?.name ?? '';

    this.cvService.updateCv({ downloadFilename, file }).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Your CV has been updated',
      });

      this.fetchData();
    });
  }

  public handleDownloadCv(): void {
    this.cvService.downloadCv().subscribe();
  }

  private fetchData(): void {
    this.isLoading = true;

    const cv = this.cvService.getCv();
    const files = this.storageService.getFiles();

    zip(cv, files).subscribe(([cv, files]) => {
      this.currentCv = cv;
      this.storageData = files;

      const activeFile = files.find(
        (file) => file.name === this.currentCv.file
      )!;

      this.cvUpdateForm.controls.file.setValue(activeFile);
      this.cvUpdateForm.controls.downloadFilename.setValue(cv.downloadFilename);

      this.isLoading = false;
    });
  }
}
