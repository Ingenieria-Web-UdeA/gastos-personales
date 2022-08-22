import { gql } from '@apollo/client';

const GET_USER_TRANSACTIONS = gql`
  query ObtenerUsuario($email: String) {
    obtenerUsuario(email: $email) {
      email
      name
      phoneNumber
      transactions {
        amount
        concept
        type
      }
    }
  }
`;

export { GET_USER_TRANSACTIONS };
