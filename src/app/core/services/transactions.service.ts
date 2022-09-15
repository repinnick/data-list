import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransactionResponse } from '@core/models/transaction.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  public getTransactions(): Observable<ITransactionResponse> {
    return this.http.get<ITransactionResponse>('./../../../assets/transactions.json');
  }
}
