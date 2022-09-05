import prisma from '@config/prisma';
import { Resolver } from 'types';

const BankAccountResolvers: Resolver = {
  BankAccount: {
    transactions: async (parent, args) =>
      await prisma.transaction.findMany({
        where: {
          bankAccountId: {
            equals: parent.id,
          },
        },
      }),
    user: async (parent, args) =>
      await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      }),
  },
  Query: {
    getUserBankAccounts: async (parent, args) =>
      await prisma.bankAccount.findMany({
        where: {
          user: {
            email: {
              equals: args.where.email,
            },
          },
        },
      }),
  },
  Mutation: {},
};

export { BankAccountResolvers };
