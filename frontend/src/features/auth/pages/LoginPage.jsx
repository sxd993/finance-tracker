import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { Loading } from "../../../shared/ui/Loading";

export const LoginPage = () => {
    const navigate = useNavigate();

    const {
        mutate: login,
        isLoading,
        error,
        reset: clearError
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        clearError();

        login(data, {
            onSuccess: () => navigate("/home"),
        });
    }

    const errorMessage = error?.response?.data?.message || error?.message;

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            <div>
                <h1 className="text-2xl font-bold">
                    <span className="text-orange-500">Finance</span> Tracker
                </h1>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center w-full h-full">
                    <Loading />
                </div>
            ) : (
                <form
                    className="bg-white px-6 py-8 flex flex-col items-center gap-4 w-full max-w-sm rounded-lg shadow-lg"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className="text-2xl font-bold text-gray-600 text-center">
                        Авторизация
                    </h2>

                    {/* Ошибка от сервера */}
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-2 w-full">
                            <p className="text-red-600 text-xs text-center leading-tight">
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    {/* Поле логина */}
                    <div className="flex flex-col gap-1 w-full">
                        <input
                            type="text"
                            placeholder="Логин"
                            {...register("login", {
                                required: "Логин обязателен",
                                minLength: {
                                    value: 3,
                                    message: "Логин должен быть не менее 3 символов",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Логин может содержать только буквы, цифры и подчеркивания",
                                },
                            })}
                            className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${errors.login
                                ? "border-red-300 focus:ring-red-400 focus:border-red-300"
                                : "border-gray-200 focus:ring-orange-400 focus:border-transparent"
                                }`}
                            disabled={isLoading}
                        />
                        <div className="h-4">
                            {errors.login && (
                                <p className="text-red-500 text-xs animate-in slide-in-from-top-1 duration-200">
                                    {errors.login.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Поле пароля */}
                    <div className="flex flex-col gap-1 w-full">
                        <input
                            type="password"
                            placeholder="Пароль"
                            {...register("password", {
                                required: "Пароль обязателен",
                                minLength: {
                                    value: 6,
                                    message: "Пароль должен быть не менее 6 символов",
                                },
                            })}
                            className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password
                                ? "border-red-300 focus:ring-red-400 focus:border-red-300"
                                : "border-gray-200 focus:ring-orange-400 focus:border-transparent"
                                }`}
                            disabled={isLoading}
                        />
                        <div className="h-4">
                            {errors.password && (
                                <p className="text-red-500 text-xs animate-in slide-in-from-top-1 duration-200">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Кнопка входа */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        disabled={isLoading}
                    >
                        {isLoading ? "Загрузка..." : "Войти"}
                    </button>

                    {/* Ссылка на регистрацию */}
                    <div className="text-center text-sm text-gray-500">
                        Нет аккаунта?{" "}
                        <NavLink
                            to="/register"
                            className="text-orange-500 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded"
                        >
                            Зарегистрироваться
                        </NavLink>
                    </div>
                </form>
            )}
        </div>
    );
};