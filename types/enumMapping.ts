import { Enum_TransactionType } from '@prisma/client';

const transactionEnumMapping = {
  [Enum_TransactionType.Expense]: 'Gasto',
  [Enum_TransactionType.Income]: 'Ingreso',
};

export { transactionEnumMapping };
