import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ITransactionsData,
  ITransaction,
  ITransactionResponse,
  TRANSACTION_NAMES,
  TransactionCategoriesView,
  TransactionCategories,
  TRANSACTIONS_ORDER, ICategoryData
} from '@core/models/transactions.model';
import { map, Observable } from 'rxjs';

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
          const categories = this.generateTransactionCategories(data);
          return {
            total,
            categories
          }
        })
      )
  }

  public getTransactionsByCategory(transactionType: TransactionCategories): Observable<ITransaction[]> {
    return this.http.get<ITransactionResponse>('./../../../assets/transactions.json')
      .pipe(
        map(({data}) => data.filter((transaction) => transaction.type === transactionType))
      )
  }

  private generateTransactionCategories(data: ITransaction[]): ICategoryData[] {
    // generate object with separate categories and setup total and name for each
    const categories = data.reduce((accumulator, item) => {
        const type = item.type as keyof typeof accumulator;
        accumulator[type]
          ? accumulator[type].total += 1
          : accumulator[type] = {total: 1, name: TRANSACTION_NAMES[type]}
        return accumulator;
      },
      {} as TransactionCategoriesView
    )
    // sorting categories by order
    // transform previous object to array
    return Object.keys(categories)
      .sort((a, b) => TRANSACTIONS_ORDER.indexOf(a as keyof typeof categories) - TRANSACTIONS_ORDER.indexOf(b as keyof typeof categories))
      .map((item, idx) => ({
        ...categories[item as keyof typeof categories],
        id: idx
      }))
  }
}
