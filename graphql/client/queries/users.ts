import { gql } from '@apollo/client';

const GET_USER_TRANSACTIONS = gql`
  query ObtenerUsuario($email: String) {
    obtenerUsuario(email: $email) {
      email
      name
      transactions {
        amount
        concept
        type
        bankAccount {
          name
        }
        file
      }
    }
  }
`;

export { GET_USER_TRANSACTIONS };
