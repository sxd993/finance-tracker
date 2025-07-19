import { useCallback } from 'react';

export const useAuthErrors = (setError) => {
  const handleAuthError = useCallback((error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error?.message;
    
    if (status === 401 || status === 400) {
      setError('root.serverError', {
        message: 'Неверный логин или пароль'
      });
    } else if (status === 422) {
      const validationErrors = error?.response?.data?.errors;
      if (validationErrors) {
        Object.keys(validationErrors).forEach(field => {
          setError(field, {
            message: validationErrors[field][0]
          });
        });
      }
    } else if (status === 429) {
      setError('root.serverError', {
        message: 'Слишком много попыток входа. Попробуйте позже'
      });
    } else if (status >= 500) {
      setError('root.serverError', {
        message: 'Ошибка сервера. Попробуйте позже'
      });
    } else if (!navigator.onLine) {
      setError('root.serverError', {
        message: 'Нет подключения к интернету'
      });
    } else {
      setError('root.serverError', {
        message: 'Произошла ошибка при входе. Попробуйте еще раз'
      });
    }
  }, [setError]);

  return { handleAuthError };
};