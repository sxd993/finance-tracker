import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FlagIcon from '@mui/icons-material/Flag';


export const Navigation = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 border-r bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow-lg z-50 h-16">
            <div className="h-full border-r border-gray-200 flex-1 flex justify-center items-center">
                <Link to="/home" className={`flex flex-col items-center px-2 rounded-lg transition-colors ${isActive('/home') ? 'text-orange-500' : 'text-gray-500 hover:text-orange-700'}`}>
                    <HomeIcon />
                    <span className="text-xs">Главная</span>
                </Link>
            </div>

            <div className="h-full border-r border-gray-200 flex-1 flex justify-center items-center">
                <Link to="/transactions" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/transactions') ? 'text-orange-500' : 'text-gray-500 hover:text-orange-700'}`}>
                    <ReceiptIcon />
                    <span className="text-xs text-center"> Транзакции</span>
                </Link>
            </div>

            <div className="h-full flex-1 flex justify-center items-center">
                <Link to="/goals" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/goals') ? 'text-orange-500' : 'text-gray-500 hover:text-orange-700'}`}>
                    <FlagIcon />
                    <span className="text-xs">Цели</span>
                </Link>
            </div>
        </nav>
    );
};