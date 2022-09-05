import { gql } from 'apollo-server-micro';

const TransactionTypes = gql`
  type Transaction {
    id: ID
    amount: Float
    type: String
    concept: String
    date: Date
    user: User
    bankAccount: BankAccount
  }

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
  }

  type Mutation {
    createTransaction(data: CreateTransactionInput): Transaction
  }
`;

export { TransactionTypes };
