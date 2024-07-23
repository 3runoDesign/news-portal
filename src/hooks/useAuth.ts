
// import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
// import { useEffect } from 'react';

export function useAuth() {
    const { token, isLogged } = useAuthStore();

    return { token, isLogged };
}
