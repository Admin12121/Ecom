"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, removeToken, storeToken } from "@/lib/store/Service/LocalStorageServices";
import { useDispatch } from "react-redux";
import { unSetUserToken, setUserToken } from "@/lib/store/Feature/authSlice";
import { toast } from "sonner";
import { useLoginUserMutation,useUserdeviceMutation } from "@/lib/store/Service/User_Auth_Api";
import axios from 'axios';

interface User {
  email: string;
  name : string;
  profile: any; 
}

interface AuthContextType {
  userLogin: User | null;
  setuserLogin: any;
  isLoggedIn: boolean;
  handleLogin: (credentials: { email: string; password: string }) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DeviceDetails {
  device_type: string;
  device_os: string;
  ip_address?: string;
}

const getDeviceDetails = (): Omit<DeviceDetails, 'ip_address'> => {
  const device_type = /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
  const device_os = navigator.platform;

  return { device_type, device_os};
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [userDevice] = useUserdeviceMutation();
  const [userLogin, setuserLogin] = useState<User | null>(null);
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails | null>(null);

  useEffect(() => {
    const details = getDeviceDetails();
    axios.get('https://api64.ipify.org?format=json')
      .then(response => {
        const ip_address = response.data.ip;
        setDeviceDetails({ ...details, ip_address });
      })
      .catch(error => console.error('Error fetching IP address:', error));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const { access_token } = getToken();
      setIsLoggedIn(!!access_token);
    };
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const sendDeviceDetailsToApi = async(deviceDetails:DeviceDetails) => {
    if (deviceDetails) {
      try{
        const res = await userDevice(deviceDetails);
        console.log(res)
      }catch (error) {
        toast.error("An error occurred while trying to log in. Please try again later.");
        console.error("Login error:", error);
      }
    }
  };

  const handleLogin = async (credentials: { email: string; password: string;  }) => {
    try {
      const deviceDetails = await getDeviceDetails();

      const credentialsWithDeviceDetails = { ...credentials, deviceDetails };
      const res = await loginUser(credentialsWithDeviceDetails);

      if ("error" in res) {
        const error = res.error as {
          status: number;
          data: {
            errors?: {
              non_field_errors?: string[];
              user?: string[];
              email?: string[];
            };
            error?: string;
            user?: User;
          };
        };
  
        if (error.data) {
          const { errors, error: errorMsg, user } = error.data;
  
          if (errors) {
            const errorMessages = errors.non_field_errors || errors.user || errors.email || ["An unknown error occurred"];
            toast.error(errorMessages[0]);
          } else if (errorMsg) {
            toast.error(errorMsg);
            setuserLogin(user || null);
          }
  
          return;
        }
      }

      if (res.data) {
        const token = res.data?.token;
        storeToken(token);
        dispatch(setUserToken(token));
        toast.success("Login successful");
        setIsLoggedIn(true);
        if(deviceDetails){
          sendDeviceDetailsToApi(deviceDetails);
        }
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
    setuserLogin(null)
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{setuserLogin, userLogin, isLoggedIn, handleLogin, handleLogout }}>
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
