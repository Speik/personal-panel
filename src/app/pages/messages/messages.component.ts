import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { IClientMessage } from './messages.model';
import { ClientMessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  public isLoading = false;
  public clientMessagesData: IClientMessage[] = [...new Array(6)];

  public constructor(
    private clientMessagesService: ClientMessagesService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getClientMessages();
  }

  public parseMessage(clientMessage: string): string {
    return clientMessage.trim().replaceAll('\n', '<br>');
  }

  public confirmDelete(event: Event, message: IClientMessage): void {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      message: `Are you sure you want to delete message from ${message.name}?`,
      target: event.target!,
      accept: this.deleteFile.bind(this, message),
    });
  }

  private deleteFile(message: IClientMessage): void {
    this.clientMessagesService.deleteMessage(message).subscribe(() => {
      this.getClientMessages();
    });
  }

  private getClientMessages(): void {
    this.isLoading = true;

    this.clientMessagesService.getMessages().subscribe((messages) => {
      this.clientMessagesData = messages;
      this.isLoading = false;
    });
  }
}
