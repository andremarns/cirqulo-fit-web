"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, User } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, gender: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = apiService.getToken();
      if (token) {
        try {
          console.log('Verifying token...');
          const userData = await apiService.getCurrentUser();
          console.log('User data loaded:', userData);
          setUser(userData);
        } catch (error) {
          console.log('Token invalid, removing...');
          apiService.removeToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      setIsLoading(true);
      
      const response = await apiService.login({ email, password });
      console.log('Login response received');
      apiService.setToken(response.access_token);
      
      const userData = await apiService.getCurrentUser();
      console.log('User data received:', userData);
      setUser(userData);
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, gender: string) => {
    try {
      const userData = await apiService.register({
        name,
        email,
        password,
        gender: gender as 'male' | 'female' | 'other'
      });
      
      // Após registro, fazer login automaticamente
      await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    // Limpar dados de gamificação
    localStorage.removeItem('cirqulofit-stats');
    
    apiService.removeToken();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
