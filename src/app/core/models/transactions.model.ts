export interface ITransactionResponse {
  total: number,
  data: ITransaction[]
}

export interface ITransaction {
  address: string;
  amount: number;
  company: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  phone: string;
  type: string;
  _id: string;
}

export interface ITransactionsData extends MainPageCategories {
  total: number;
}

export interface ICategoryData {
  total: number;
  name: string;
  id: number;
}

// ENUMS

export enum TRANSACTION_TYPES {
  INCOME = 'income',
  OUTCOME = 'outcome',
  LOAN = 'loan',
  INVESTMENT = 'investment',
}

// TYPES

export type TransactionName = TRANSACTION_TYPES.INCOME | TRANSACTION_TYPES.OUTCOME | TRANSACTION_TYPES.LOAN | TRANSACTION_TYPES.INVESTMENT;
export type MainPageCategories = Record<TRANSACTION_TYPES, ICategoryData>;

// CONSTANTS
export const TRANSACTION_NAMES = {
  [TRANSACTION_TYPES.INCOME]: 'Income',
  [TRANSACTION_TYPES.INVESTMENT]: 'Investments',
  [TRANSACTION_TYPES.LOAN]: 'Loans',
  [TRANSACTION_TYPES.OUTCOME]: 'Outcome'
}