import { ExpensesChart } from "./ExpensesChart";

export const Expenses = ({ categories }) => {
  const filteredData = categories.filter(item => item.total > 0 && item.name !== "Доход");
  return (
    <div className="flex flex-col w-full p-10" >
      <h1>Расходы по категориям</h1>
        {filteredData.map((category) => (
            <div key={category.id}>
              <div className="flex flex-row items-center justify-between mt-2">
                <h2 className=" text-neutral-500">{category.name}</h2>
                <p className=" text-orange-500">{category.total}</p>
              </div>
            </div>
        ))}
      <ExpensesChart data={filteredData}/>
    </div>
  );
};