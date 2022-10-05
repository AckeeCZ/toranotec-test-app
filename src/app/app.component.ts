import { Component, OnInit } from '@angular/core';
import { GifsResult } from '@giphy/js-fetch-api';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { GiphyService } from './giphy.service';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <h1>Gif seeker</h1>

      <app-search (queryChange)="searchQuerySubject$.next($event)"></app-search>

      <div class="empty-message" *ngIf="(searchQuerySubject$ | async) === ''">
        No search term = no Gifs 🤷‍♂️
      </div>
      <app-gifs-list [gifs]="gifs" *ngIf="totalCount | async"></app-gifs-list>

      <app-pagination
        *ngIf="totalCount | async"
        [pageSize]="pageSize"
        [totalCount]="totalCount"
        (pageChange)="pageIndexSubject$.next($event)"
      ></app-pagination>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pageSize: number = 9;

  protected pageIndexSubject$ = new BehaviorSubject<number>(0);
  protected searchQuerySubject$ = new BehaviorSubject<string>('');

  gifsResult: Observable<GifsResult>;

  gifs: Observable<GifsResult['data']>;
  totalCount: Observable<number>;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.gifsResult = combineLatest([
      this.pageIndexSubject$,
      this.searchQuerySubject$,
    ]).pipe(
      switchMap(([pageIndex, searchQuery]) =>
        this.giphyService.getGifs(
          searchQuery,
          this.pageSize,
          this.pageSize * pageIndex
        )
      )
    );

    this.gifs = this.gifsResult.pipe(map((result) => result.data));
    this.totalCount = this.gifsResult.pipe(
      map((result) => result.pagination.total_count)
    );
  }
}
