import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ITransactionsData,
  ITransaction,
  ITransactionResponse,
  MainPageCategories,
  TRANSACTION_NAMES,
  TRANSACTION_TYPES,
  TransactionName
} from '@core/models/transactions.model';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<ITransactionsData> {
    return this.http.get<ITransactionResponse>('./../../../assets/transactions.json')
      .pipe(
        map(({total, data}) => ({
          total,
          ...data.reduce((accumulator, item) => {
              switch (item.type) {
                case TRANSACTION_TYPES.OUTCOME:
                  this.generateTransactionCategory(accumulator, TRANSACTION_TYPES.OUTCOME, 3)
                  break;
                case TRANSACTION_TYPES.LOAN:
                  this.generateTransactionCategory(accumulator, TRANSACTION_TYPES.LOAN, 4)
                  break;
                case TRANSACTION_TYPES.INCOME:
                  this.generateTransactionCategory(accumulator, TRANSACTION_TYPES.INCOME, 1)
                  break;
                case TRANSACTION_TYPES.INVESTMENT:
                  this.generateTransactionCategory(accumulator, TRANSACTION_TYPES.INVESTMENT, 2)
                  break;
                default:
                  break;
              }
              return accumulator;
            },
            {} as MainPageCategories
          )
        })),
        tap(res => console.log(res))
      )
  }

  public getTransactionsByFilter(transactionType: TransactionName): Observable<ITransaction[]> {
    return this.http.get<ITransactionResponse>('./../../../assets/transactions.json')
      .pipe(
        map(({data}) => data.filter((transaction) => transaction.type === transactionType))
      )
  }

  private generateTransactionCategory(accumulator: MainPageCategories, category: TransactionName, id: number) {
    return accumulator[category]
      ? accumulator[category].total += 1
      : accumulator[category] = {total: 1, name: TRANSACTION_NAMES[category], id}
  }
}
