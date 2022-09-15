import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SummaryComponent } from '@pages/summary/summary.component';
import { TransactionsListComponent } from '@pages/transactions-list/transactions-list.component';


@NgModule({
  declarations: [
    SummaryComponent,
    TransactionsListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
