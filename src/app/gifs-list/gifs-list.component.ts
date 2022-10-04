import { Component, OnInit } from '@angular/core';
import { GifsResult } from '@giphy/js-fetch-api';
import { Observable, map, switchMap, BehaviorSubject } from 'rxjs';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrls: ['./gifs-list.component.scss'],
})
export class GifsListComponent implements OnInit {
  pageSize: number = 9;

  private pageIndexSubject$ = new BehaviorSubject(0);

  gifs: Observable<{
    data: GifsResult['data'];
    totalCount: number;
  }>;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.gifs = this.pageIndexSubject$.pipe(
      switchMap((pageIndex) =>
        this.giphyService
          .getTrending(this.pageSize, this.pageSize * pageIndex)
          .pipe(
            map((result) => {
              return {
                data: result.data,
                totalCount: result.pagination.total_count,
              };
            })
          )
      )
    );
  }

  onPageChange(pageIndex: number): void {
    this.pageIndexSubject$.next(pageIndex);
  }
}
