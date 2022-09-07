/* eslint-disable arrow-body-style */
import prisma from '@config/prisma';
import { Resolver } from 'types';

const TransactionResolvers: Resolver = {
  Transaction: {
    bankAccount: async (parent, args, context) => {
      if (context.session.user.roles?.some((role) => role.name === 'ADMIN')) {
        return await prisma.bankAccount.findUnique({
          where: {
            id: parent.bankAccountId,
          },
        });
      }

      return null;
    },
  },
  Query: {},
  Mutation: {
    createTransaction: async (parent, args, context) => {
      return await prisma.transaction.create({
        data: {
          amount: args.data.amount,
          concept: args.data.concept,
          date: new Date(args.data.date).toISOString(),
          type: args.data.transactionType,
          bankAccount: {
            connect: {
              id: args.data.bankAccountId,
            },
          },
          user: {
            connect: {
              email: context.session.user?.email ?? '',
            },
          },
        },
      });
    },
  },
};

export { TransactionResolvers };
