import type { NextPage } from 'next';
import Head from 'next/head';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
      phoneNumber: true,
    },
  });

  console.log('back: ', users);

  return {
    props: {
      users,
    }, // will be passed to the page component as props
  };
}

const Home: NextPage = ({ users }) => {
  console.log('front: ', users);
  return (
    <div>
      <Head>
        <title>Gastos Personales</title>
        <meta name='description' content='Aplicación para gestionar gastos personales' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>Usuarios</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
