import { useQuery } from '@apollo/client';
import { GET_USER_TRANSACTIONS } from '@graphql/client/users/queries/users';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Transaction } from '@prisma/client';

// export async function getServerSideProps() {
//   const users = await prisma.user.findMany({
//     select: {
//       email: true,
//       name: true,
//       id: true,
//       phoneNumber: true,
//     },
//   });

//   console.log('back: ', users);

//   return {
//     props: {
//       users,
//     }, // will be passed to the page component as props
//   };
// }

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_USER_TRANSACTIONS, {
    variables: {
      email: 'dsaldarriaga@prevalentware.com',
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>Gastos Personales</title>
        <meta
          name='description'
          content='Aplicación para gestionar gastos personales'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>Transacciones para {data.obtenerUsuario.name}</h1>
        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Concepto</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {data.obtenerUsuario.transactions.map((t: Transaction) => (
              <tr>
                <td>{t.amount}</td>
                <td>{t.concept}</td>
                <td>{t.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
