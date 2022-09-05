import { UserResolvers } from '@graphql/server/users/resolvers';
import { TransactionResolvers } from '@graphql/server/transactions/resolvers';
import { BankAccountResolvers } from '@graphql/server/bankAccounts/resolvers';

const GlobalResolvers = [
  UserResolvers,
  TransactionResolvers,
  BankAccountResolvers,
];

export { GlobalResolvers };
