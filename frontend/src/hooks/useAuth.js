"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

export function useAuth({ requireAuth = true } = {}) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAuth = AuthService.isAuthenticated();

    if (requireAuth && !isAuth) {
      router.replace('/admin/login');
      return;
    }

    if (!requireAuth && isAuth) {
      router.replace('/admin/dashboard');
      return;
    }

    setCurrentUser(AuthService.getCurrentUser());
    setChecking(false);
  }, [requireAuth, router]);

  const logout = () => {
    AuthService.logout();
    router.replace('/admin/login');
  };

  return { currentUser, checking, logout };
}
