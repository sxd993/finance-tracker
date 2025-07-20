import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { login } from "../../../api/authApi";
import { Loading } from "../../../components/Loading";
import { useAuthErrors } from "../../../hooks/useAuthErrors";

export const Login = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const { handleAuthError } = useAuthErrors(setError);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/home");
    },
    onError: handleAuthError,
  });

  const onSubmit = (data) => {
    clearErrors("root.serverError");
    mutation.mutate(data);
  };

  const getErrorMessage = () => {
    if (errors.root?.serverError) {
      return errors.root.serverError.message;
    }

    if (errors.login) return errors.login.message;
    if (errors.password) return errors.password.message;

    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="bg-white px-6 py-8 flex flex-col gap-4 w-full max-w-sm rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-gray-600 text-center">
          habbit<span className="text-orange-500">Tracker</span>
        </h2>

        <div className="h-12 flex items-center justify-center">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-md p-2 w-full animate-in slide-in-from-top-1 duration-300">
              <p className="text-red-600 text-xs text-center leading-tight">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        {mutation.isPending && <Loading />}

        <div className="flex flex-col gap-1">
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
                message:
                  "Логин может содержать только буквы, цифры и подчеркивания",
              },
            })}
            className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.login
                ? "border-red-300 focus:ring-red-400 focus:border-red-300"
                : "border-gray-200 focus:ring-orange-400 focus:border-transparent"
            }`}
            disabled={mutation.isPending}
          />
          <div className="h-4">
            {errors.login && (
              <p className="text-red-500 text-xs animate-in slide-in-from-top-1 duration-200">
                {errors.login.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
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
            className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.password
                ? "border-red-300 focus:ring-red-400 focus:border-red-300"
                : "border-gray-200 focus:ring-orange-400 focus:border-transparent"
            }`}
            disabled={mutation.isPending}
          />
          <div className="h-4">
            {errors.password && (
              <p className="text-red-500 text-xs animate-in slide-in-from-top-1 duration-200">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Загрузка..." : "Войти"}
        </button>

        <div className="text-center text-sm text-gray-500">
          Нет аккаунта?{" "}
          <NavLink
            to="/register"
            className="text-orange-500 hover:underline transition-colors duration-200"
          >
            Зарегистрироваться
          </NavLink>
        </div>
      </form>
    </div>
  );
};
