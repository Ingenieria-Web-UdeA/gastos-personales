import { gql } from 'apollo-server-micro';
import { UserTypes } from '@graphql/server/users/types';
import { TransactionTypes } from '@graphql/server/transactions/types';
import { BankAccountTypes } from '@graphql/server/bankAccounts/types';

const globalTypes = gql`
  scalar Date
`;

const GlobalTypes = [
  globalTypes,
  UserTypes,
  TransactionTypes,
  BankAccountTypes,
];

export { GlobalTypes };
