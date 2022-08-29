import prisma from '@config/prisma';
import { Resolver } from 'types';

const TransactionResolvers: Resolver = {
  Query: {},
  Mutation: {
    createTransaction: async (parent, args) => {
      return await prisma.transaction.create({
        data: {
          amount: args.data.amount,
          concept: args.data.concept,
          date: new Date(args.data.date).toISOString(),
          type: 'Expense',
          bankAccount: {
            connect: {
              id: 'cl6xjhia10029jwtqe3ggz1mj',
            },
          },
          user: {
            connect: {
              email: 'dsaldarriaga@prevalentware.com',
            },
          },
        },
      });
    },
  },
};

export { TransactionResolvers };
