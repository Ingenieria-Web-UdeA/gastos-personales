import prisma from '@config/prisma';
import { Resolver } from 'types';

const UserResolvers: Resolver = {
  User: {
    transactions: async (parent, args) => {
      const transactions = await prisma.transaction.findMany({
        where: {
          userId: {
            equals: parent.id,
          },
        },
      });
      return transactions;
    },
    bankAccounts: async (parent, args) =>
      await prisma.bankAccount.findMany({
        where: {
          userId: parent.id,
        },
      }),
  },
  Query: {
    obtenerUsuarios: async () => {
      const users = await prisma.user.findMany();
      return users;
    },
    obtenerUsuario: async (parent, args, context) => {
      if (!context.session) {
        return null;
      }
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
      return user;
    },
    contarUsuarios: async () => {
      const conteo = await prisma.user.count();

      return conteo;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const newUser = await prisma.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          phoneNumber: args.data.phoneNumber,
          document: args.data.document,
        },
      });
      return newUser;
    },
    updateUser: async (parent, args) => {
      const updatedUser = await prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: {
            set: args.name,
          },
        },
      });
      return updatedUser;
    },
    deleteUser: async (parent, args) => {
      const deletedUser = await prisma.user.delete({
        where: {
          id: args.id,
        },
      });

      return deletedUser;
    },
  },
};

export { UserResolvers };
