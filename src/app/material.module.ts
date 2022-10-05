import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatGridListModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
