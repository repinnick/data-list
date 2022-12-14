import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  ITransaction,
  ITransactionsQueryParams,
  TRANSACTION_NAMES,
  TRANSACTIONS_ORDER
} from '@core/models/transactions.model';
import { fade } from '@core/animations/fade';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  animations: [fade]
})
export class TransactionsListComponent implements OnInit, OnDestroy {
  public tabCategories = TRANSACTIONS_ORDER;
  public tabNames = TRANSACTION_NAMES;
  public transactions: ITransaction[];
  public activeTab: number;
  private destroy = new Subject<void>();

  constructor(
    private transactionsService: TransactionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeTab = Number(this.activatedRoute.snapshot.queryParams['tab']);
    this.getCategoryData(this.activeTab);
    this.handleRouteChange()
  }

  public handleRouteChange(): void {
    this.router.events
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (event) => {
          if (event instanceof NavigationEnd) {
            const tabId = Number((this.activatedRoute.snapshot.queryParams as ITransactionsQueryParams).tab)
            this.activeTab = tabId;
            this.getCategoryData(tabId)
          }
        }
      })
  }

  private getCategoryData(idx: number) {
    this.transactions = [];
    const categoryName = TRANSACTIONS_ORDER[idx];
    this.transactionsService.getTransactionsByCategory(categoryName)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (transactions) => {
          this.transactions = transactions;
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
