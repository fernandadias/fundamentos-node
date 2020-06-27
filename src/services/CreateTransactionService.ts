import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction | Error {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('I do not understand this type, sorry');
    }
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();

      if (total < value) throw new Error('Without money, dude :(');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
