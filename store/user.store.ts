import { create } from 'zustand'

export interface User {
    id: string,
    name: string,
    avatar: string,
}

interface AuthState extends User {
    setAuth: (user: User) => void
    clearAuth: () => void
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    id: '',
    name: '',
    avatar: '',
    setAuth: (user) => set((state) => ({ ...state, ...user })),
    clearAuth: () => set({ id: '', name: '', avatar: '' }),
}))
