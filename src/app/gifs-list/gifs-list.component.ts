import { Component, OnInit } from '@angular/core';
import { GifsResult } from '@giphy/js-fetch-api';
import { Observable, map } from 'rxjs';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  styleUrls: ['./gifs-list.component.scss'],
})
export class GifsListComponent implements OnInit {
  gifs: Observable<GifsResult['data']>;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    this.gifs = this.giphyService
      .getTrending()
      .pipe(map((result) => result.data));
  }
}
