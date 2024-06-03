"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, removeToken, storeToken } from '@/lib/store/Service/LocalStorageServices';
import { useDispatch } from 'react-redux';
import { unSetUserToken, setUserToken } from '@/lib/store/Feature/authSlice';
import { toast } from 'sonner';
import { useLoginUserMutation } from '@/lib/store/Service/User_Auth_Api';

interface AuthContextType {
  isLoggedIn: boolean;
  handleLogin: (credentials: { email_or_username: string; password: string }) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  useEffect(() => {
    const handleStorageChange = () => {
      const { access_token } = getToken();
      setIsLoggedIn(!!access_token);
    };

    window.addEventListener("storage", handleStorageChange);

    // Set initial state
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogin = async (credentials: { email_or_username: string; password: string }) => {
    const res = await loginUser(credentials);
    if (res.error) {
        const errorWithPossibleData = res.error as { data?: { error_description?: string } };
        const errorData = errorWithPossibleData.data?.error_description;
        if (errorData) {
          toast.error(errorData);
        }
      }
    if (res.data) {
      const token = res.data;
      storeToken(token);
      dispatch(setUserToken(token));
      toast.success("Login successful");
      setIsLoggedIn(true);
    }
  };
  
  const handleLogout = () => {
    dispatch(unSetUserToken());
    removeToken();
    toast.success("Logged out");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;