import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TransactionList } from './TransactionList';
import { useQuery } from '@tanstack/react-query';
import { getListOfTransactions } from '../../api/transactionApi';
import { Loading } from '../../components/Loading';
import { useState } from 'react';
import { AddTransaction } from './AddTransaction';

export const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getListOfTransactions,
  });

  if (isLoading) return <div><Loading /></div>;
  if (error) return <div>Ошибка загрузки транзакций</div>;
  return (
    <div className="flex flex-col items-center justify-top pt-5 gap-5">
      <div className="flex flex-row items-center justify-between w-[90%]">
        <h1 className="text-2xl font-bold text-center">Транзакции</h1>
        <AddCircleIcon style={{ fontSize: 30 }} className="text-orange-500" onClick={handleOpen} />
        {isOpen && <AddTransaction handleClose={handleClose} />}
      </div>
      <TransactionList transactions={transactions} />
    </div>
  );
};