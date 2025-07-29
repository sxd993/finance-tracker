import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { TransactionList } from './TransactionList';
import { useQuery } from '@tanstack/react-query';
import { getListOfTransactions } from '../../api/transactionApi';
import { Loading } from '../../components/Loading';
import { useCallback, useState } from 'react';
import { AddTransaction } from './AddTransaction';

export const Transactions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getListOfTransactions,
  });

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <Loading />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-red-500 font-medium">Ошибка загрузки транзакций</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col items-center pt-6 gap-6 w-full pb-8">
        <div className="flex flex-row items-center justify-between w-[90%] max-w-md">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <ReceiptIcon style={{ fontSize: 24 }} className="text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Транзакции</h1>
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors shadow-lg hover:shadow-xl"
            onClick={handleOpen}
          >
            <AddIcon style={{ fontSize: 20 }} />
          </button>
        </div>

        <div className="w-[90%] max-w-md">
          <TransactionList transactions={transactions} />
        </div>

        {isOpen && <AddTransaction handleClose={handleClose} />}
      </div>
    </div>
  );
};