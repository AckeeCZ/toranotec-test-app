import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  template: `
    <mat-paginator
      hidePageSize="true"
      [length]="totalCount | async"
      [pageSize]="pageSize"
      (page)="onPageChange($event.pageIndex)"
    ></mat-paginator>
  `,
})
export class PaginationComponent {
  @Input()
  pageSize = 0;

  @Input()
  totalCount: Observable<number>;

  @Output()
  pageChange = new EventEmitter<number>();

  constructor() {}

  onPageChange(pageIndex: number): void {
    this.pageChange.emit(pageIndex);
  }
}
