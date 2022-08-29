import { UserResolvers } from '@graphql/server/users/resolvers';
import { TransactionResolvers } from '@graphql/server/transactions/resolvers';

const GlobalResolvers = [UserResolvers, TransactionResolvers];

export { GlobalResolvers };
