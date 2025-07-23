import { useEffect } from "react";
import { BalanceCard } from "./BalanceCard";
import { Expenses } from "./Expenses";
import { getExpensesByLogin } from "../../api/dashboardApi";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../components/Loading";
import { useAuthStore } from "../../store/authStore";

export const DashBoardPage = () => {
  const { user } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesByLogin,
  });
  console.log(JSON.stringify(data));
  
  useEffect(() => {
  }, [user]);

  if (isLoading) return <div><Loading/></div>;
  if (error) return <div>Ошибка загрузки расходов</div>;
  return (
    <>
      <div className="flex flex-col  items-center justify-top h-screen pt-5 gap-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-2xl font-bold text-center">Главная</h1>
          <p className="text-sm text-center">Добро пожаловать, {user.name}</p>
        </div>
        <BalanceCard income={user.income} expenses={data.expenses} />
        <Expenses categories={data.categories} />
      </div>
    </>
  );
};
