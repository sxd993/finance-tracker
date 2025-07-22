import { useState } from "react";
import { Modal } from "../../components/Modal";
import { ModalAddIncome } from "./ModalAddIncome";
import { addIncome } from "../../api/dashboardApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const BalanceCard = ({ income }) => {
  const expenses = 1000;
  const balance = income - expenses;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomeValue, setIncomeValue] = useState(income);

  const handleIncomeChange = (e) => {
    setIncomeValue(e.target.value);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addIncome,
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries(["auth"]);
    },
  });

  const handleSaveIncome = () => {
    if (!isNaN(Number(incomeValue)) && Number(incomeValue) >= 0) {
      mutation.mutate({ income: Number(incomeValue) });
    }
  };
  return (
    <div className="flex flex-col items-center gap-2 justify-top shadow-lg bg-white w-[90%] rounded-lg !p-5">
      <div className="flex flex-col">
        <h1 className=" text-center w-full" >Общее состояние финансов</h1>
        <h1 className="text-4xl text-left w-full flex gap-2 justify-center" >{balance} ₽</h1>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1>Доходы</h1>
        <h1 className="text-xl text-orange-500" onClick={() => {
          setIsModalOpen(true);
        }} >{income}</h1>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <ModalAddIncome
              incomeValue={incomeValue}
              handleIncomeChange={handleIncomeChange}
              handleSaveIncome={handleSaveIncome}
              isLoading={mutation.isLoading}
              isError={mutation.isError}
            />
          </Modal>
        )}
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1>Расходы</h1>
        <h1 className="text-xl text-orange-500" >{expenses} ₽</h1>
      </div>
    </div>
  );
};