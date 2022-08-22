import { gql } from 'apollo-server-micro';

const UserTypes = gql`
  type User {
    id: ID
    email: String
    name: String
    phoneNumber: String
    document: String
    transactions: [Transaction]
  }

  input UserCreateInput {
    email: String
    name: String
    phoneNumber: String
    document: String
  }

  type Query {
    obtenerUsuarios: [User]
    obtenerUsuario(email: String): User
    contarUsuarios: Int
  }

  type Mutation {
    crearUsuario(data: UserCreateInput): User
    updateUser(id: String, name: String): User
    deleteUser(id: String): User
  }
`;

export { UserTypes };
