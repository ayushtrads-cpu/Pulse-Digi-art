import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Basic user storage for client-side only app
interface User {
  email: string;
  passwordHash: string; // Storing plain or basic hash for demo
}

interface AuthContextType {
  email: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(() => {
    return localStorage.getItem('pulse_auth_email');
  });

  const isAuthenticated = !!email;

  const getUsers = (): User[] => {
    try {
      const users = localStorage.getItem('pulse_users');
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  };

  const login = (inputEmail: string, inputPassword: string) => {
    const users = getUsers();
    const user = users.find(u => u.email === inputEmail);
    
    if (!user) {
      return { success: false, error: 'User not found. Please sign up.' };
    }
    
    // In a real app, securely check password hash. Here we use basic string match for demo.
    if (user.passwordHash !== btoa(inputPassword)) {
      return { success: false, error: 'Incorrect password.' };
    }
    
    setEmail(inputEmail);
    localStorage.setItem('pulse_auth_email', inputEmail);
    return { success: true };
  };

  const signup = (inputEmail: string, inputPassword: string) => {
    const users = getUsers();
    if (users.find(u => u.email === inputEmail)) {
      return { success: false, error: 'User already exists. Please sign in.' };
    }
    
    const newUser = {
      email: inputEmail,
      passwordHash: btoa(inputPassword)
    };
    
    localStorage.setItem('pulse_users', JSON.stringify([...users, newUser]));
    setEmail(inputEmail);
    localStorage.setItem('pulse_auth_email', inputEmail);
    return { success: true };
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem('pulse_auth_email');
  };

  return (
    <AuthContext.Provider value={{ email, isAuthenticated, login, signup, logout }}>
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
