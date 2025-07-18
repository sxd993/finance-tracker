import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/home");
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <form
                className="bg-white px-10 py-8 flex flex-col gap-6 w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-3xl font-bold text-gray-500 text-center mb-2">
                    Регистрация
                </h2>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="placeholder:text-gray-400 p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder:text-gray-400 p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="placeholder:text-gray-400 p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <button
                    type="submit"
                    className="mt-2 p-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

