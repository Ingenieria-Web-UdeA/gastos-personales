import { gql } from 'apollo-server-micro';

const TransactionTypes = gql`
  type Transaction {
    id: ID
    amount: Float
    type: String
    concept: String
    user: User
  }
`;

export { TransactionTypes };
