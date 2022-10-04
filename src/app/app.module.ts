import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GifsListComponent } from './gifs-list/gifs-list.component';

@NgModule({
  declarations: [AppComponent, GifsListComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatGridListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
