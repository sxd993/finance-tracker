import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { register as registerApi } from "../../../api/authApi";
import { Loading } from "../../../components/Loading";
import { useAuthErrors } from "../../../hooks/useAuthErrors";
import { useAuthStore } from "../../../store/authStore";

export const Register = () => {
  const { setIsAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, loading } = useAuthStore();
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
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const { handleAuthError } = useAuthErrors(setError);

  const mutation = useMutation({
    mutationFn: registerApi,
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
    mutation.mutate({
      login: data.login,
      password: data.password,
      name: data.name,
    });
  };

  const getErrorMessage = () => {
    if (errors.root?.serverError) {
      return errors.root.serverError.message;
    }

    if (errors.login) return errors.login.message;
    if (errors.name) return errors.name.message;
    if (errors.password) return errors.password.message;

    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div>
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">Finance</span> Tracker
        </h1>
      </div>
      {mutation.isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <form
          className="bg-white px-6 py-8 flex flex-col gap-4 w-full max-w-sm rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold text-gray-600 text-center">
            Регистрация
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
              className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${errors.login
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
              type="text"
              placeholder="Имя"
              {...register("name", { required: "Имя обязательно" })}
              className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${errors.name
                  ? "border-red-300 focus:ring-red-400 focus:border-red-300"
                  : "border-gray-200 focus:ring-orange-400 focus:border-transparent"
                }`}
              disabled={mutation.isPending}
            />
            <div className="h-4">
              {errors.name && (
                <p className="text-red-500 text-xs animate-in slide-in-from-top-1 duration-200">
                  {errors.name.message}
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
              className={`w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password
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
            {mutation.isPending ? "Загрузка..." : "Зарегистрироваться"}
          </button>

          <div className="text-center text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <NavLink
              to="/login"
              className="text-orange-500 hover:underline transition-colors duration-200"
            >
              Войти
            </NavLink>
          </div>
        </form>
      )}
    </div>
  );
};