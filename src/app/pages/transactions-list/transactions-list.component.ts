import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction, TRANSACTION_NAMES, TRANSACTIONS_ORDER } from '@core/models/transactions.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
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
  }

  public changeActiveTab(idx: number): void {
    this.router.navigate([], {queryParams: {tab: idx}})
    this.activeTab = idx;
    this.getCategoryData(idx);
  }

  private getCategoryData(idx: number) {
    const categoryName = TRANSACTIONS_ORDER[idx];
    this.transactionsService.getTransactionsByCategory(categoryName)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (transactions) => this.transactions = transactions
      })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
