import { Component, OnInit } from '@angular/core';
import { GifsResult } from '@giphy/js-fetch-api';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { GiphyService } from './giphy.service';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <h1>Gif seeker</h1>

      <app-gifs-list [gifs]="gifs"></app-gifs-list>
      <app-pagination
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

  protected pageIndexSubject$ = new BehaviorSubject(0);

  gifsResult: Observable<GifsResult>;

  gifs: Observable<GifsResult['data']>;
  totalCount: Observable<number>;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.gifsResult = this.pageIndexSubject$.pipe(
      switchMap((pageIndex) =>
        this.giphyService.getGifs(this.pageSize, this.pageSize * pageIndex)
      )
    );

    this.gifs = this.gifsResult.pipe(map((result) => result.data));
    this.totalCount = this.gifsResult.pipe(
      map((result) => result.pagination.total_count)
    );
  }
}
