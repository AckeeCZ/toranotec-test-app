import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api';
import { environment } from '../environments/environment';

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  gf: GiphyFetch;

  constructor() {
    this.gf = new GiphyFetch(environment.giphyApiKey);
  }

  getGifs(query: string, limit = 9, offset = 0): Observable<GifsResult> {
    return from(this.gf.search(query, { offset, limit }));
  }
}
