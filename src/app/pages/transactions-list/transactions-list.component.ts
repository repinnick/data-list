import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '@core/services/transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ITransaction, TRANSACTION_NAMES, TRANSACTIONS_ORDER } from '@core/models/transactions.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
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
    this.activeTab = this.getQueryParamsFromRoute();
    this.getCategoryData(this.activeTab);
    this.handleRouteChange();
  }

  public changeActiveTab(idx: number): void {
    this.router.navigate([], {queryParams: {tab: idx}})
  }

  /**
   * Or we can change active tab in changeActiveTab function and remove this
   * @private
   */
  private handleRouteChange(): void {
    this.router.events
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: navigation => {
          if (navigation instanceof NavigationEnd) {
            this.activeTab = this.getQueryParamsFromRoute();
            this.getCategoryData(this.activeTab);
          }
        }
      })
  }

  private getQueryParamsFromRoute(): number {
    return Number(this.activatedRoute.snapshot.queryParams['tab']);
  }

  private getCategoryData(idx: number) {
    const categoryName = TRANSACTIONS_ORDER[idx];
    this.transactionsService.getTransactionsByFilter(categoryName)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (transactions) => this.transactions = transactions,
      })
  }
}
