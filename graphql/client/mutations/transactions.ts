import { gql } from '@apollo/client';

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput) {
    createTransaction(data: $data) {
      id
    }
  }
`;

export { CREATE_TRANSACTION };
