import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { IStorageItem } from './storage.model';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
})
export class StorageComponent implements OnInit {
  public isLoading = false;
  public storageData: IStorageItem[] = [...new Array(6)];

  public constructor(
    private storageService: StorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  public ngOnInit(): void {
    this.getFiles();
  }

  public getTotalStorageSize(): number {
    return this.storageData.reduce((result, file) => {
      if (!file?.size) return result;
      return result + file.size;
    }, 0);
  }

  public getStorageSize(): string {
    const totalSize = this.getTotalStorageSize();
    if (totalSize == 0) return '0 KB';

    const kb = 1000;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    const unitIndex = Math.floor(Math.log(totalSize) / Math.log(kb));
    const targetUnit = units.at(unitIndex)!;

    const storageSize = parseFloat((totalSize / kb ** unitIndex).toFixed(2));
    return `${storageSize} ${targetUnit}`;
  }

  public handleUpload(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'File Uploaded',
    });

    this.getFiles();
  }

  public confirmDelete(event: Event, file: IStorageItem): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete file ${file.originalName}?`,
      target: event.target!,
      accept: this.deleteFile.bind(this, file),
    });
  }

  private deleteFile(file: IStorageItem): void {
    this.storageService.deleteFile(file).subscribe(() => {
      this.getFiles();
    });
  }

  private getFiles(): void {
    this.isLoading = true;

    this.storageService.getFiles().subscribe((files) => {
      this.storageData = files;
      this.isLoading = false;
    });
  }
}
