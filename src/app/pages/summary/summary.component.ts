import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ICategoryData } from '@core/models/transactions.model';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  public total: number;
  public transactions: ICategoryData[];
  private destroy = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  private getTransactions(): void {
    this.transactionsService.getTransactions()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: ({total, categories}) => {
          this.total = total;
          this.transactions = categories;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
