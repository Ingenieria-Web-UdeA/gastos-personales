import prisma from '@config/prisma';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

interface MatchRolesProps {
  context: GetServerSidePropsContext;
}

const matchRoles = async ({ context }: MatchRolesProps) => {
  const session = await getSession({ req: context.req });
  const currentPage = await prisma.page.findUnique({
    where: {
      path: context.resolvedUrl,
    },
    include: {
      roles: true,
    },
  });

  const pageRoles = currentPage?.roles.map((role) => role.name);

  const roleCheck = session?.user?.roles?.some((role) =>
    pageRoles?.includes(role.name)
  );

  return {
    roleCheck,
    isPublic: currentPage?.isPublic ?? false,
    name: currentPage?.name ?? '',
  };
};

export { matchRoles };
