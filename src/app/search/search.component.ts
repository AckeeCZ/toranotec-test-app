import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, tap } from 'rxjs';

const DEBOUNCE_TIMEOUT = 400;

@Component({
  selector: 'app-search',
  template: `
    <mat-form-field class="search-form-field" appearance="fill">
      <mat-label>Write down a term to search gifs by</mat-label>
      <input
        matInput
        type="text"
        [value]="query$ | async"
        (input)="handleChangeQuery($event)"
      />
      <button
        *ngIf="query$ | async"
        matSuffix
        mat-icon-button
        aria-label="Clear"
        (click)="clear()"
      >
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  query$ = new Subject<string>();

  @Output()
  queryChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.query$
      .pipe(debounceTime(DEBOUNCE_TIMEOUT), distinctUntilChanged())
      .subscribe((q) => this.queryChange.emit(q));
  }

  handleChangeQuery(event: Event) {
    const query = (event.currentTarget as HTMLInputElement).value;
    this.query$.next(query);
  }

  clear() {
    this.query$.next('');
  }
}
