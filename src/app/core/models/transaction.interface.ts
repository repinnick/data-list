export interface ITransactionResponse {
  total: number,
  data: ITransaction[]
}

export interface ITransaction {
  address: string;
  amount: string;
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
