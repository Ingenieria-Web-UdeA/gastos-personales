import { gql } from 'apollo-server-micro';

const TransactionTypes = gql`
  enum Enum_TransactionType {
    Expense
    Income
  }

  input CreateTransactionInput {
    amount: Float!
    concept: String!
    date: Date!
    transactionType: Enum_TransactionType!
    bankAccountId: String!
    file: String!
  }

  type Mutation {
    crearTransaccion(data: CreateTransactionInput): Transaction
  }
`;

export { TransactionTypes };
