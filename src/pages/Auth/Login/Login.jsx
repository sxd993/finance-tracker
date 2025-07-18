import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/home");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                className="bg-white px-10 py-8 flex flex-col gap-6 w-full max-w-sm rounded-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold text-gray-500 text-center mb-2">
                    habbit<span className="text-orange-500">Tracker</span>
                </h2>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full h-12 px-4 py-3 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 py-3 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
                <button
                    type="submit"
                    className="w-full h-12 px-4 py-3 mt-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-200"
                >
                    Войти
                </button>
                <div className="text-center text-sm text-gray-500 mt-2">
                    Нет аккаунта? <NavLink to="/register" className="text-orange-500 hover:underline transition-colors duration-200">Зарегистрироваться</NavLink>
                </div>
            </form>
        </div>
    );
};