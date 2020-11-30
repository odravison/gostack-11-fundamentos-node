import Transaction from '../models/Transaction';

interface TransactionDTO {
  value: number;
  type: 'outcome' | 'income';
  title: string;
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeAmount = this.transactions.reduce((accumulator, current) => {
      if (current.type === 'income') {
        accumulator.value += current.value;
        return accumulator;
      }
      return accumulator;
    }, new Transaction({ title: '', value: 0, type: 'income' }));

    const outcomeAmount = this.transactions.reduce((accumulator, current) => {
      if (current.type === 'outcome') {
        accumulator.value += current.value;
        return accumulator;
      }
      return accumulator;
    }, new Transaction({ title: '', value: 0, type: 'income' }));

    return {
      income: incomeAmount.value,
      outcome: outcomeAmount.value,
      total: incomeAmount.value - outcomeAmount.value,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
