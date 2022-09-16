import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ICategoryData, TRANSACTION_TYPES } from '@core/models/transactions.model';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public total: number;
  public transactions: ICategoryData[];
  private destroy = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.getTransactions();

    this.transactionsService.getTransactionsByFilter(TRANSACTION_TYPES.INVESTMENT).subscribe((res) => console.log(res))
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
}
