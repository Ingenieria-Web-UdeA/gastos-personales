import { matchRoles } from '@utils/matchRoles';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { roleCheck, isPublic, name } = await matchRoles({ context });

  if (isPublic) {
    return {
      props: { name },
    };
  }

  if (!roleCheck) {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    };
  }

  return {
    props: { name },
  };
}

const AdminPage = () => {
  return <div>Pagina que solo es visible a administradores</div>;
};

export default AdminPage;
