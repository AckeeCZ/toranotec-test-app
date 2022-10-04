import { Component, Input } from '@angular/core';
import { GifsResult } from '@giphy/js-fetch-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gifs-list',
  template: `
    <mat-grid-list cols="3" gutterSize="10">
      <mat-grid-tile *ngFor="let gif of gifs | async">
        <img src="{{ gif.images.original.url }}" />
      </mat-grid-tile>
    </mat-grid-list>
  `,
})
export class GifsListComponent {
  @Input()
  gifs: Observable<GifsResult['data']>;
}
