import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FlagIcon from '@mui/icons-material/Flag';

export const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className='fixed bottom-0 left-0 right-0 flex justify-around items-center bg-white border-t border-gray-200 shadow-lg z-50'>
            <div className="flex flex-col items-center justify-center flex-1 h-full">
                <Link
                    to="/home"
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors duration-200 ${isActive('/home') ? 'text-orange-500 bg-orange-50' : 'text-gray-500 hover:text-orange-700 hover:bg-orange-50'}`}
                >
                    <HomeIcon className="w-6 h-6" />
                    <span className="text-xs font-medium">Главная</span>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 min-h-[64px]">
                <Link
                    to="/transactions"
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors duration-200 ${isActive('/transactions') ? 'text-orange-500 bg-orange-50' : 'text-gray-500 hover:text-orange-700 hover:bg-orange-50'}`}
                >
                    <ReceiptIcon className="w-6 h-6" />
                    <span className="text-xs font-medium">Транзакции</span>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 min-h-[64px]">
                <Link
                    to="/goals"
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors duration-200 ${isActive('/goals') ? 'text-orange-500 bg-orange-50' : 'text-gray-500 hover:text-orange-700 hover:bg-orange-50'}`}
                >
                    <FlagIcon className="w-6 h-6" />
                    <span className="text-xs font-medium">Цели</span>
                </Link>
            </div>
        </nav>
    );
};