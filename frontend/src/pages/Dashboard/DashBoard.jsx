import { useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import { BalanceCard } from "../../components/DashBoard/BalanceCard";
import { Expenses } from "../../components/DashBoard/Expenses";
// import { getExpensesByLogin } from "../../api/dashboardApi"; // Закомментировал неиспользуемый импорт
// import { useQuery } from "@tanstack/react-query"; // Закомментировал неиспользуемый импорт
import { Loading } from "../../shared/ui/Loading";
import { useAuthStore } from "../../features/auth/authStore";

export const DashBoard = () => {
  const { user } = useAuthStore();
  
  // Заглушки данных (замените на реальные запросы когда будете готовы)
  const data = { expenses: 100, categories: [] };
  const isLoading = false;
  const error = null;

  useEffect(() => {
    // Логика загрузки данных (пока пустая)
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
              Добро пожаловать, <span className="text-orange-600">{user?.name || 'Пользователь'}</span>!
            </p>
          </div>
        </div>

        <div className="w-[90%] max-w-md flex flex-col gap-4">
          <BalanceCard income={user?.income || 0} expenses={data?.expenses || 0} />
          <Expenses categories={data?.categories || []} />
        </div>
      </div>
    </div>
  );
};