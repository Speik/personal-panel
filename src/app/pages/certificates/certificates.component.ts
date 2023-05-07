import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { environment } from 'src/environments/environment';

import { ICertificate } from './certificates.model';
import { CertificatesService } from './certificates.service';

import { StorageService } from '../storage/storage.service';
import { IStorageItem } from '../storage/storage.model';

type EditForm = {
  id: Nullable<string>;
  form: FormGroup;
};

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
})
export class CertificatesComponent implements OnInit {
  public currentYear = new Date().getFullYear();

  public isLoading = false;
  public isCreationVisible = false;
  public certificatesData: ICertificate[] = [...new Array(6)];
  public imagesData: IStorageItem[] = [];

  public certificateCreationForm = this.fb.group({
    name: ['', [Validators.required]],
    issuerName: ['', [Validators.required]],
    year: [this.currentYear, [Validators.required]],
    credentialUrl: ['', [Validators.required]],
    thumbnail: [<IStorageItem>{}, [Validators.required]],
  });

  public certificateEdit: EditForm = {
    id: null,
    form: this.fb.group({
      name: ['', [Validators.required]],
      issuerName: ['', [Validators.required]],
      year: [this.currentYear, [Validators.required]],
      credentialUrl: ['', [Validators.required]],
      thumbnail: [<IStorageItem>{}, [Validators.required]],
    }),
  };

  public constructor(
    private fb: FormBuilder,
    private certificatesService: CertificatesService,
    private confirmationService: ConfirmationService,
    private storageService: StorageService
  ) {}

  public ngOnInit(): void {
    this.getCertificates();
    this.getImages();
  }

  public getImageUrl(filename: string): string {
    return `${environment.baseStorageUrl}/${filename}`;
  }

  public toggleCreationForm(): void {
    this.isCreationVisible = !this.isCreationVisible;
  }

  public confirmDelete(event: Event, certificate: ICertificate): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete certificate ${certificate.name}?`,
      target: event.target!,
      accept: this.deleteCertificate.bind(this, certificate),
    });
  }

  public handleCreateCertificate(): void {
    if (!this.certificateCreationForm.valid) {
      return;
    }

    const controls = this.certificateCreationForm.controls;

    const newCertificate: ICertificate = {
      name: controls.name.value?.trim() ?? '',
      issuerName: controls.issuerName.value?.trim() ?? '',
      year: controls.year.value ?? this.currentYear,
      credentialUrl: controls.credentialUrl.value?.trim() ?? '',
      thumbnail: controls.thumbnail.value?.name ?? '',
    };

    this.certificateCreationForm.reset();
    this.isCreationVisible = false;

    this.certificatesService.createCertificate(newCertificate).subscribe(() => {
      this.getCertificates();
    });
  }

  public showEditCertificate(certificate: ICertificate): void {
    if (!certificate) return;

    const controls = this.certificateEdit.form.controls;
    const selectedThumbnail = this.imagesData.find((image) => {
      return image.name === certificate.thumbnail;
    });

    this.certificateEdit.id = certificate.id!;
    controls?.['name'].setValue(certificate.name);
    controls?.['issuerName'].setValue(certificate.issuerName);
    controls?.['year'].setValue(certificate.year);
    controls?.['credentialUrl'].setValue(certificate.credentialUrl);
    controls?.['thumbnail'].setValue(selectedThumbnail);
  }

  public hideEditForm(): void {
    this.certificateEdit.id = null;
    this.certificateEdit.form.reset();
  }

  public handleEditCertificate(): void {
    if (!this.certificateEdit.form.valid) {
      return;
    }

    const id = this.certificateEdit.id!;
    const controls = this.certificateEdit.form.controls;

    const updatedCertificate: ICertificate = {
      name: controls?.['name'].value?.trim() ?? '',
      issuerName: controls?.['issuerName'].value?.trim() ?? '',
      year: controls?.['year'].value ?? this.currentYear,
      credentialUrl: controls?.['credentialUrl'].value?.trim() ?? '',
      thumbnail: controls?.['thumbnail'].value?.name ?? '',
    };

    this.hideEditForm();

    this.certificatesService
      .updateCertificate(id, updatedCertificate)
      .subscribe(() => {
        this.getCertificates();
      });
  }

  private deleteCertificate(certificate: ICertificate): void {
    this.certificatesService.deleteCertificate(certificate).subscribe(() => {
      this.getCertificates();
    });
  }

  private getCertificates(): void {
    this.isLoading = true;

    this.certificatesService.getCertificates().subscribe((certificates) => {
      this.certificatesData = certificates;
      this.isLoading = false;
    });
  }

  private getImages(): void {
    this.storageService.getImages().subscribe((images) => {
      this.imagesData = images;
    });
  }
}
