import { useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import WavingHandIcon from '@mui/icons-material/WavingHand';
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

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <Loading />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="text-red-500 font-medium">Ошибка загрузки расходов</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col items-center pt-6 gap-6 w-full pb-8">
        <div className="flex flex-col items-center gap-4 w-[90%] max-w-md">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <HomeIcon style={{ fontSize: 24 }} className="text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Главная</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <p className="text-sm text-gray-600 font-medium">
              Добро пожаловать, <span className="text-orange-600">{user.name}</span>!
            </p>
          </div>
        </div>
        
        <div className="w-[90%] max-w-md flex flex-col gap-4">
          <BalanceCard income={user.income} expenses={data.expenses} />
          <Expenses categories={data.categories} />
        </div>
      </div>
    </div>
  );
};