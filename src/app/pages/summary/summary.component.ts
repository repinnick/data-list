import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ITransaction } from '@core/models/transaction.interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public total: number;
  public transactions: ITransaction[];
  private destroy = new Subject<void>();

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.getTransactions()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: res => {
          this.total = res.total;
          this.transactions = res.data;
          const amount = this.transactions[0].amount;
          console.log(amount)
        }
      })
  }

}
