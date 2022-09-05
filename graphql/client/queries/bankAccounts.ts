import { gql } from '@apollo/client';

const GET_USER_BANK_ACCOUNTS = gql`
  query GetUserBankAccounts($where: GetUserBankAccountsInput!) {
    getUserBankAccounts(where: $where) {
      name
      id
    }
  }
`;

export { GET_USER_BANK_ACCOUNTS };
