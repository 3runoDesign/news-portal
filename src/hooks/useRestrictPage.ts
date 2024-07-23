import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'next/navigation';

const useRestrictPage = () => {
  const router = useRouter();
  const { isLogged } = useAuthStore((state) => ({
    isLogged: state.isLogged
  }));

  useEffect(() => {
    if (!isLogged) {
      router.push('/login');
    }
  }, [isLogged, router]);
};

export default useRestrictPage;
