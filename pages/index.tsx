import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_TRANSACTIONS } from '@graphql/client/queries/users';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { Dialog } from '@mui/material';
import { CREATE_TRANSACTION } from '@graphql/client/mutations/transactions';
import { toast } from 'react-toastify';
import useFormData from 'hooks/useFormData';
import { transactionEnumMapping } from 'types/enumMapping';
import { GET_USER_BANK_ACCOUNTS } from '@graphql/client/queries/bankAccounts';
import { ExtendedTransaction } from 'types';
import { BankAccount } from '@prisma/client';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data, loading } = useQuery(GET_USER_TRANSACTIONS, {
    variables: {
      email: session?.user?.email ?? '',
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    console.log(session, status);
  }, [status, session]);

  if (loading || status === 'loading') {
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
      <div className='flex flex-col'>
        <div className='flex'>
          {status === 'unauthenticated' && (
            <button
              type='button'
              onClick={() => signIn('auth0')}
              className='primary'
            >
              Iniciar sesion
            </button>
          )}
          {status === 'authenticated' && (
            <button type='button' onClick={() => signOut()} className='primary'>
              Cerrar Sesión
            </button>
          )}
        </div>
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
                    <th>Cuenta</th>
                  </tr>
                </thead>
                <tbody>
                  {data.obtenerUsuario.transactions.map(
                    (t: ExtendedTransaction) => (
                      <tr>
                        <td>{t.amount}</td>
                        <td>{t.concept}</td>
                        <td>{transactionEnumMapping[t.type]}</td>
                        <td>{t.bankAccount.name}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
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
  const { data: session } = useSession();
  const { form, formData, updateFormData } = useFormData(null);
  const { data: bankAccountData, loading: bankAccountLoading } = useQuery(
    GET_USER_BANK_ACCOUNTS,
    {
      variables: {
        where: {
          email: session?.user?.email ?? '',
        },
      },
      fetchPolicy: 'cache-and-network',
    }
  );

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
            transactionType: formData.transactionType,
            bankAccountId: formData.bankAccount,
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

  if (bankAccountLoading) return <div>Loading...</div>;

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
        <label htmlFor='transactionType'>
          <span>Tipo de transacción</span>
          <select name='transactionType' defaultValue=''>
            <option disabled value=''>
              Seleccione el tipo
            </option>
            {Object.keys(transactionEnumMapping).map((element) => (
              <option value={element}>{transactionEnumMapping[element]}</option>
            ))}
          </select>
        </label>

        <label htmlFor='bankAccount'>
          <span>Cuenta de banco</span>
          <select name='bankAccount' defaultValue=''>
            <option disabled value=''>
              Seleccione la cuenta
            </option>
            {bankAccountData.getUserBankAccounts.map(
              (bankAccount: BankAccount) => (
                <option value={bankAccount.id}>{bankAccount.name}</option>
              )
            )}
          </select>
        </label>

        <button className='primary' type='submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Crear transacción'}
        </button>
      </form>
    </div>
  );
};

export default Home;
