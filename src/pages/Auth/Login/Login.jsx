import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { login } from '../../../api/authApi';
import { Loading } from '../../../components/Loading';

export const Login = () => {
  const queryClient = useQueryClient();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      navigate('/home');
    },
    onError: (error) => {
      setError('login', { message: error.message || 'Неверный логин или пароль' });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        className="bg-white px-6 py-8 flex flex-col gap-4 w-full max-w-sm rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-gray-600 text-center">
          habbit<span className="text-orange-500">Tracker</span>
        </h2>
        {errors.login && <p className="text-red-500 text-sm text-center">{errors.login.message}</p>}
        {mutation.isLoading && <Loading />}
        <input
          type="text"
          placeholder="Логин"
          {...register('login', { required: 'Логин обязателен', minLength: { value: 3, message: 'Логин должен быть не менее 3 символов' } })}
          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          disabled={mutation.isLoading}
        />
        <input
          type="password"
          placeholder="Пароль"
          {...register('password', { required: 'Пароль обязателен', minLength: { value: 6, message: 'Пароль должен быть не менее 6 символов' } })}
          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
          disabled={mutation.isLoading}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 mt-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors duration-200"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Загрузка...' : 'Войти'}
        </button>
        <div className="text-center text-sm text-gray-500">
          Нет аккаунта?{' '}
          <NavLink to="/register" className="text-orange-500 hover:underline transition-colors duration-200">
            Зарегистрироваться
          </NavLink>
        </div>
      </form>
    </div>
  );
};