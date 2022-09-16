import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SummaryComponent } from '@pages/summary/summary.component';
import { TransactionsListComponent } from '@pages/transactions-list/transactions-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    SummaryComponent,
    TransactionsListComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
