import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from '@pages/summary/summary.component';
import { TransactionsListComponent } from '@pages/transactions-list/transactions-list.component';

const routes: Routes = [
  { path: '', component: SummaryComponent },
  { path: 'navigator', component: TransactionsListComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
