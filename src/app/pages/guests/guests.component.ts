import { Component, OnInit } from '@angular/core';
import { IGuest } from './guests.model';
import { GuestsService } from './guests.service';

const PAGE_SIZES = [4, 8, 16].map((i) => {
  return { label: i, value: i };
});

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
})
export class GuestsComponent implements OnInit {
  public readonly pageSizesOptions = PAGE_SIZES;
  public pageSize = this.pageSizesOptions.at(0)!.value;

  public currentPage = 0;
  public totalGuestsCount = 0;

  public isLoading = false;
  public guestsData: IGuest[] = [...new Array(this.pageSize)];
  public shownGuests: IGuest[] = [];

  public constructor(private guestsService: GuestsService) {}

  public ngOnInit(): void {
    this.getData();
  }

  public handlePageChange(event: IPaginatorEvent): void {
    this.currentPage = event.page;
    this.showGuests();
  }

  public handleSizeChange(): void {
    this.currentPage = 0;
    this.showGuests();
  }

  private showGuests(): void {
    const page = this.currentPage;
    const size = this.pageSize;
    const offset = page * size;

    this.shownGuests = this.guestsData.slice(offset, offset + size);
  }

  private getData(): void {
    this.isLoading = true;

    this.guestsService.getGuests().subscribe((guests) => {
      this.guestsData = guests;
      this.totalGuestsCount = guests.length;

      this.isLoading = false;

      this.showGuests();
    });
  }
}
