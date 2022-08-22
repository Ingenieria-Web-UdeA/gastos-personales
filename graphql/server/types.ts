import { gql } from 'apollo-server-micro';
import { UserTypes } from '@graphql/server/users/types';
import { TransactionTypes } from '@graphql/server/transactions/types';

// const globalTypes = gql``;

const GlobalTypes = [UserTypes, TransactionTypes];

export { GlobalTypes };
