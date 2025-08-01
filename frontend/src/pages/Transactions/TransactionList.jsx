import { formatDate } from '../../utils/formatDate';
import React, { useMemo } from 'react';

export const TransactionList = React.memo(({ transactions }) => {
    const sortedTransactions = useMemo(() => {
        return [...transactions.transactions].sort((a, b) => b.id - a.id);
    }, [transactions.transactions]);
  

  return (
    <div className="flex flex-col items-center w-[90%] overflow-y-auto gap-5 py-5 mx-auto">
      {sortedTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between w-full bg-white border border-neutral-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{transaction.description}</span>
            <span className="text-sm font-medium text-orange-500">{transaction.category}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className={`text-lg font-bold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
              {transaction.type === 'expense' ? '-' : '+'} {Math.abs(transaction.amount)} ₽
            </span>
            <span className="text-xs text-gray-400">{formatDate(transaction.date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
});