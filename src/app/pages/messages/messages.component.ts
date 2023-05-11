import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { IClientMessage } from './messages.model';
import { ClientMessagesService } from './messages.service';

const PAGE_SIZES = [2, 4, 8].map((i) => {
  return { label: i, value: i };
});

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  public readonly pageSizesOptions = PAGE_SIZES;
  public pageSize = this.pageSizesOptions.at(0)!.value;

  public currentPage = 0;
  public totalMessagesCount = 0;

  public isLoading = false;
  public clientMessagesData: IClientMessage[] = [...new Array(this.pageSize)];
  public shownMessages: IClientMessage[] = [];

  public constructor(
    private clientMessagesService: ClientMessagesService,
    private confirmationService: ConfirmationService
  ) {}

  public ngOnInit(): void {
    this.getClientMessages();
  }

  public handlePageChange(event: IPaginatorEvent): void {
    this.currentPage = event.page;
    this.showMessages();
  }

  public handleSizeChange(): void {
    this.currentPage = 0;
    this.showMessages();
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

  private showMessages(): void {
    const page = this.currentPage;
    const size = this.pageSize;
    const offset = page * size;

    this.shownMessages = this.clientMessagesData.slice(offset, offset + size);
  }

  private getClientMessages(): void {
    this.isLoading = true;

    this.clientMessagesService.getMessages().subscribe((messages) => {
      this.clientMessagesData = messages;
      this.totalMessagesCount = messages.length;

      this.isLoading = false;

      this.showMessages();
    });
  }
}
