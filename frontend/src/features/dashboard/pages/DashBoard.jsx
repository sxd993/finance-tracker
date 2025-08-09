import HomeIcon from '@mui/icons-material/Home';
import { useCurrentUser } from '../../../shared/api/useCurrentUser'
import { BalanceCard } from '../components/BalanceCard';
import { useExpenses } from '../hooks/useExpenses';


export const Dashboard = () => {
  const { user } = useCurrentUser();
  const { expenses } = useExpenses();

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
        <BalanceCard income={user?.income} expenses={expenses} />
        <div className="w-[90%] max-w-md flex flex-col gap-4">
        </div>
      </div>
    </div>
  );
};