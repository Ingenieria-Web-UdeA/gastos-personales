import { gql } from '@apollo/client';

const CREATE_TRANSACTION = gql`
  mutation CrearTransaccion($data: CreateTransactionInput) {
    crearTransaccion(data: $data) {
      id
    }
  }
`;

export { CREATE_TRANSACTION };
