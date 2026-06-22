import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  email: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(() => {
    return localStorage.getItem('pulse_auth_email');
  });

  const isAuthenticated = !!email;

  const login = (newEmail: string) => {
    setEmail(newEmail);
    localStorage.setItem('pulse_auth_email', newEmail);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem('pulse_auth_email');
  };

  return (
    <AuthContext.Provider value={{ email, isAuthenticated, login, logout }}>
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