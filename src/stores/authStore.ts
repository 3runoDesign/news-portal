import { create } from 'zustand';

const saveTokenToLocalStorage = (token: string | null) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

const loadTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('authToken') || null;
};

interface AuthState {
  token: string | null;
  isLogged: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: loadTokenFromLocalStorage(),
  isLogged: !!loadTokenFromLocalStorage(),
  setToken: (token) => {
    saveTokenToLocalStorage(token);
    set({ token, isLogged: !!token });
  },
  logout: () => {
    saveTokenToLocalStorage(null);
    set({ token: null, isLogged: false });
  }
}));
