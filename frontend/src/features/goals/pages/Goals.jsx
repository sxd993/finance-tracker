
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import { formatMoney } from '../../utils/Goals/formatMoney';

export const Goals = () => {
    const goals = [
        { id: 1, title: "Купить машину", amount: 1000000, currentAmount: 250000 },
        { id: 2, title: "Отпуск в Японии", amount: 300000, currentAmount: 2800 },
        { id: 3, title: "Новый MacBook", amount: 150000, currentAmount: 140000 }
    ];


    if (goals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] w-full gap-6 px-5">
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-full p-8">
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Начните с первой цели</h3>
                    <p className="text-gray-500">Добавьте цель и начните откладывать на мечту</p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                    <AddIcon style={{ fontSize: 20 }} />
                    Добавить цель
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="flex flex-col items-center pt-6 gap-6 w-full pb-8">
                <div className="flex flex-row items-center justify-between w-[90%] max-w-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <TrackChangesIcon style={{ fontSize: 24 }} className="text-orange-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Цели</h1>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-colors shadow-lg hover:shadow-xl">
                        <AddIcon style={{ fontSize: 20 }} />
                    </button>
                </div>
                
                <div className="w-[90%] max-w-md flex flex-col gap-4">
                    {goals.map((goal) => {
                        const percent = Math.min(100, (goal.currentAmount / goal.amount) * 100);
                        const isNearComplete = percent >= 85;
                        
                        return (
                            <div
                                key={goal.id}
                                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Фоновый градиент для прогресса */}
                                <div 
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-50 to-transparent opacity-40 transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                />
                                
                                <div className="relative z-10">
                                    <div className="flex flex-row justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{goal.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {formatMoney(goal.currentAmount)} ₽ из {formatMoney(goal.amount)} ₽
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isNearComplete && (
                                                <div className="bg-green-100 p-1 rounded-full">
                                                    <TrendingUpIcon style={{ fontSize: 16 }} className="text-green-600" />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                                {percent.toFixed(0)}%
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-700 ease-out ${
                                                isNearComplete 
                                                    ? 'bg-gradient-to-r from-green-400 to-green-500' 
                                                    : 'bg-gradient-to-r from-orange-400 to-orange-500'
                                            }`}
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    
                                    <div className="mt-3 flex justify-between items-center text-xs">
                                        <span className="text-gray-400">
                                            Осталось: {formatMoney(goal.amount - goal.currentAmount)} ₽
                                        </span>
                                        {isNearComplete && (
                                            <span className="text-green-600 font-medium">Почти готово! 🎉</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
            </div>
        </div>
    );
};