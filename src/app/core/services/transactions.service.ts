import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ITransactionsData,
  ITransaction,
  ITransactionResponse,
  TRANSACTION_NAMES,
  TRANSACTION_TYPES,
  TransactionCategoriesView,
  TransactionCategories, TRANSACTIONS_ORDER
} from '@core/models/transactions.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {
  }

  public getTransactions(): Observable<ITransactionsData> {
    return this.http.get<ITransactionResponse>('./../../../assets/transactions.json')
      .pipe(
        map(({total, data}) => {
          const categories = data.reduce((accumulator, item) => {
              const type = item.type as keyof typeof accumulator;
              this.generateTransactionCategory(accumulator, type);
              return accumulator;
            },
            {} as TransactionCategoriesView
          )
          const orderedCategoriesArray = Object.keys(categories)
            .sort((a , b) => TRANSACTIONS_ORDER.indexOf(a as keyof typeof categories) - TRANSACTIONS_ORDER.indexOf(b as keyof typeof categories))
            .map((item, idx) => ({
              ...categories[item as keyof typeof categories],
              id: idx + 1
            }))
          return {
            total,
            categories: orderedCategoriesArray
          }
        }),
        tap(res => console.log(res))
      )
  }

  public getTransactionsByFilter(transactionType: TransactionCategories): Observable<ITransaction[]> {
    return this.http.get<ITransactionResponse>('./../../../assets/transactions.json')
      .pipe(
        map(({data}) => data.filter((transaction) => transaction.type === transactionType))
      )
  }

  private generateTransactionCategory(accumulator: TransactionCategoriesView, category: TransactionCategories) {
    return accumulator[category]
      ? accumulator[category].total += 1
      : accumulator[category] = {total: 1, name: TRANSACTION_NAMES[category]}
  }
}
