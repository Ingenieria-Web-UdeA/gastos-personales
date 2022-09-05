import { gql } from 'apollo-server-micro';

const BankAccountTypes = gql`
  type BankAccount {
    id: ID
    name: String
    description: String
    user: User
    transactions: [Transaction]
  }

  input GetUserBankAccountsInput {
    email: String!
  }

  type Query {
    getUserBankAccounts(where: GetUserBankAccountsInput!): [BankAccount]
  }
`;

export { BankAccountTypes };
