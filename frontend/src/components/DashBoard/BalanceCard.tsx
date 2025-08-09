
export const BalanceCard = ({ income, expenses }) => {
  const balance = income - expenses;
  return (
    <div className="flex flex-col items-center gap-2 justify-top shadow-lg bg-white w-[90%] rounded-lg m-auto p-5">
      <div className="flex flex-col">
        <h1 className=" text-center w-full" >Общее состояние финансов</h1>
        <h1 className="text-4xl text-left w-full flex gap-2 justify-center" >{balance} ₽</h1>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1>Доходы</h1>
        <h1 className="text-xl text-orange-500">{income} ₽</h1>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <h1>Расходы</h1>
        <h1 className="text-xl text-orange-500" >{expenses} ₽</h1>
      </div>
    </div>
  );
};