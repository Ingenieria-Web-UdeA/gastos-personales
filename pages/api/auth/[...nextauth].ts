import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@config/prisma';

const options = {
  callbacks: {
    async session({ session, user }: any) {
      const enrichedUser = await prisma.user.findUnique({
        where: {
          email: user.email ?? '',
        },
        include: {
          roles: true,
        },
      });

      return { ...session, user: enrichedUser };
    },
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID ?? '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, options);
}
