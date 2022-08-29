import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_TRANSACTIONS } from '@graphql/client/queries/users';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Transaction } from '@prisma/client';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { Dialog } from '@mui/material';
import { CREATE_TRANSACTION } from '@graphql/client/mutations/transactions';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';

const Home: NextPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, loading } = useQuery(GET_USER_TRANSACTIONS, {
    variables: {
      email: 'dsaldarriaga@prevalentware.com',
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-10'>
      <Head>
        <title>Gastos Personales</title>
        <meta
          name='description'
          content='Aplicación para gestionar gastos personales'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full flex flex-col items-center gap-4'>
        {data?.obtenerUsuario && (
          <>
            <div className='flex gap-2'>
              <h1>Transacciones para {data.obtenerUsuario.name}</h1>
              <button
                type='button'
                onClick={() => setOpenModal(true)}
                className='primary'
              >
                Crear nueva
              </button>
            </div>
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
          </>
        )}
      </div>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <CreateTransaction setOpenModal={setOpenModal} />
      </Dialog>
    </div>
  );
};

interface CreateTransactionProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const CreateTransaction = ({ setOpenModal }: CreateTransactionProps) => {
  const { form, formData, updateFormData } = useFormData(null);

  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION);

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await createTransaction({
        variables: {
          data: {
            amount: parseFloat(formData.amount as string),
            concept: formData.concept,
            date: formData.date,
          },
        },
        refetchQueries: [GET_USER_TRANSACTIONS],
      });
      toast.success('transacción creada con éxito');
      setOpenModal(false);
    } catch {
      toast.error('Error creando la transacción');
    }
  };

  return (
    <div className='p-3'>
      <h1>Crear nueva transacción</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='p-4 flex flex-col gap-4'
      >
        <label htmlFor='amount'>
          <span>Cantidad</span>
          <input name='amount' type='number' required />
        </label>

        <label htmlFor='concept'>
          <span>Concepto</span>
          <input name='concept' type='text' required />
        </label>

        <label htmlFor='date'>
          <span>Fecha</span>
          <input name='date' type='date' required />
        </label>

        <button className='primary' type='submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Crear transacción'}
        </button>
      </form>
    </div>
  );
};

export default Home;
