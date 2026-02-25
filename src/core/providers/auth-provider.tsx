"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser,
    clearUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
