import { gql } from 'apollo-server-micro';

const BankAccountTypes = gql`
  input GetUserBankAccountsInput {
    email: String!
  }

  type Query {
    getUserBankAccounts(where: GetUserBankAccountsInput!): [BankAccount]
  }
`;

export { BankAccountTypes };
