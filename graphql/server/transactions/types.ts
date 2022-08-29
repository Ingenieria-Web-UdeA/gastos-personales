import { gql } from 'apollo-server-micro';

const TransactionTypes = gql`
  type Transaction {
    id: ID
    amount: Float
    type: String
    concept: String
    user: User
  }

  input CreateTransactionInput {
    amount: Float!
    concept: String!
    date: Date
  }

  type Mutation {
    createTransaction(data: CreateTransactionInput): Transaction
  }
`;

export { TransactionTypes };
