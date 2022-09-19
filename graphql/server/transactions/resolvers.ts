/* eslint-disable arrow-body-style */
import prisma from '@config/prisma';
import { getObjectInBucket } from '@utils/getObjectInBucket';
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
    file: async (parent) => {
      const bucket = process.env.NEXT_PUBLIC_MEDIA_BUCKET_NAME ?? '';
      const path = parent.file?.replace(
        `https://${bucket}.s3.amazonaws.com/`,
        ''
      );
      return await getObjectInBucket(bucket, path);
    },
  },
  Query: {},
  Mutation: {
    crearTransaccion: async (parent, args, context) => {
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
          file: args.data.file,
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
