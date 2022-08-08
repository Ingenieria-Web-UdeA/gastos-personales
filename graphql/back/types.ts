import { gql } from 'apollo-server-micro';

const globalTypes = gql`
  type User {
    id: ID
    name: String
    email: String
    phoneNumber: String
  }

  type Query {
    obtenerUsuarios(cantidad: Int, orden: String, filtro: String): [User]
  }
`;

const GlobalTypes = [globalTypes];

export { GlobalTypes };
