import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
    // Состояние
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    // Действия
    setUser: (user) => set({
        user: user,
        isAuthenticated: !!user
    }),

    setInitialized: (isInitialized) => set({
        isInitialized
    }),

    logout: () => set({
        user: null,
        isAuthenticated: false
    }),

    // Геттеры
    getUser: () => get().user,
    getIsAuthenticated: () => get().isAuthenticated,
}));