"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, removeToken, storeToken } from "@/lib/store/Service/LocalStorageServices";
import { useDispatch } from "react-redux";
import { unSetUserToken, setUserToken } from "@/lib/store/Feature/authSlice";
import { toast } from "sonner";
import { useLoginUserMutation } from "@/lib/store/Service/User_Auth_Api";

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
    try {
      const res = await loginUser(credentials);

      if ("error" in res) {
        const error = res.error as { status: number; data: { errors?: { non_field_errors?: string[]; user?: string[] } } };

        if (error.status === 404 && error.data && error.data.errors) {
          const errors = error.data.errors;

          if (errors.non_field_errors && errors.non_field_errors.length > 0) {
            toast.error(errors.non_field_errors[0]);
            console.log(errors.non_field_errors[0]);
          } else if (errors.user && errors.user.length > 0) {
            toast.error(errors.user[0]);
            console.log(errors.user[0]);
          } else {
            toast.error("An unknown error occurred");
            console.log("An unknown error occurred");
          }
          return;
        }

        // Handle other status codes or error types if needed
      }

      if (res.data) {
        const token = res.data;
        storeToken(token);
        dispatch(setUserToken(token));
        toast.success("Login successful");
        setIsLoggedIn(true);
      }
    } catch (error) {
      toast.error("An error occurred while trying to log in. Please try again later.");
      console.error("Login error:", error);
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
