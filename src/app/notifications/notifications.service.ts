import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

type NotificationOptions = {
  title?: string;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  public constructor(private messageService: MessageService) {}

  public error({ title, message }: NotificationOptions): void {
    this.showNotification({
      severity: 'error',
      summary: title,
      detail: message,
    });
  }

  public httpError({ message }: NotificationOptions): void {
    this.showNotification({
      severity: 'error',
      summary: 'Request Error',
      detail: message,
    });
  }

  private showNotification({ severity, summary, detail }: Partial<Message>) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: severity === 'error' ? 5000 : 3000,
    });
  }
}
