import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApolloServer } from 'apollo-server-micro';
import { GlobalTypes } from '@graphql/server/types';
import { GlobalResolvers } from '@graphql/server/resolvers';
import NextCors from 'nextjs-cors';

const HandleServer = async (req: NextApiRequest, res: NextApiResponse) => {
  const server = new ApolloServer({
    typeDefs: [...GlobalTypes],
    resolvers: [...GlobalResolvers],
    introspection: true,
  });

  await server.start();

  return server.createHandler({
    path: '/api/graphql',
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ['POST', 'OPTIONS', 'GET', 'HEAD'],
    origin: '*',
    optionsSuccessStatus: 204,
  });
  await HandleServer(req, res);
}
