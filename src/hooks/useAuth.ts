import { useAuthStore } from '../stores/authStore';

export function useAuth() {
    const { token, isLogged } = useAuthStore();

    return { token, isLogged };
}
