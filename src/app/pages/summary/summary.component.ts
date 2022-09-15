import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import {
  ICategoryData,
  ITransaction,
  MainPageCategories,
  TRANSACTION_NAMES,
  TRANSACTION_TYPES
} from '@core/models/transactions.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public total: number;
  public transactions: ICategoryData[];
  public transactionNames = TRANSACTION_NAMES;
  private destroy = new Subject<void>();

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.getTransactions();

    this.transactionsService.getTransactionsByFilter(TRANSACTION_TYPES.INVESTMENT).subscribe((res) => console.log(res))
  }

  getTransactions() {
    this.transactionsService.getTransactions()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: ({total, ...categories}) => {
          this.total = total;
          this.transactions = Object.keys(categories).map(item => ({...categories[item as keyof typeof categories]}));
        }
      })
  }
}
