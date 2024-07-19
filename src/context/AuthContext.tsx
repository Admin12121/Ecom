"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken, removeToken, storeToken } from "@/lib/store/Service/LocalStorageServices";
import { useDispatch } from "react-redux";
import { unSetUserToken, setUserToken } from "@/lib/store/Feature/authSlice";
import { toast } from "sonner";
import { useLoginUserMutation, useUserDeviceMutation } from "@/lib/store/Service/User_Auth_Api";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";

interface User {
  email: string;
  name: string;
  profile: any;
}
interface CurrencyData {
  buy: string;
  date: string;
  iso3: string;
  modified_on: string;
  name: string;
  published_on: string;
  sell: string;
  unit: number;
  symbol: string;
}

type CurrencyDataArray = CurrencyData[];

interface AuthContextType {
  userLogin: User | null;
  setuserLogin: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  liveratedata: CurrencyDataArray | null;
  handleLogin: (credentials: { email: string; password: string; remember: boolean }) => Promise<void>;
  handleLogout: () => void;
  handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedcurrencyiso: string;
  convertPrice: (price: number) => { convertedPrice: number; symbol: string };
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DeviceDetails {
  device_type: string;
  device_os: string;
  ip_address?: string;
}

const getDeviceDetails = (): Omit<DeviceDetails, "ip_address"> => {
  const device_type = /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  const device_os = navigator.platform;

  return { device_type, device_os };
};

const getSymbol = (iso3: string) => {
  const symbols: { [key: string]: string } = {
    INR: "₹",
    USD: "$",
    CNY: "¥",
    AUD: "A$",
  };
  return symbols[iso3] || "";
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [userDevice] = useUserDeviceMutation();
  const [userLogin, setuserLogin] = useState<User | null>(null);
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails | null>(null);
  const [liveratedata, setLiveRateData] = useState<CurrencyDataArray | null>(null);
  const [reloaddata, setreloaddata] = useState<boolean>(false);
  const [selectedcurrency, setSelectedCurrency] = useState<{ sell: number; symbol: string } | null>(null);
  const [selectedcurrencyiso, setSelectedCurrencyiso] = useState<string>("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIso3 = e.target.value;
    if (selectedIso3 && liveratedata) {
      const selectedCurrency = liveratedata.find((currency) => currency.iso3 === selectedIso3);
      if (selectedCurrency) {
        setSelectedCurrencyiso(selectedIso3);
        setSelectedCurrency({
          sell: parseFloat(selectedCurrency.sell),
          symbol: selectedCurrency.symbol,
        });
      }
    }
  };

  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        const { data } = await axios.get("https://www.nrb.org.np/api/forex/v1/app-rate");
        if (data) {
          const requiredCurrencies = ["INR", "USD", "CNY", "AUD"];
          const filteredData = data.filter((currency: CurrencyData) => requiredCurrencies.includes(currency.iso3));
          const finalData = filteredData.map((currency: CurrencyData) => ({
            ...currency,
            unit: currency.iso3 === "INR" ? 1 : currency.unit,
            buy: (parseFloat(currency.buy) / (currency.unit || 1)).toFixed(2),
            sell: (parseFloat(currency.sell) / (currency.unit || 1)).toFixed(2),
            symbol: getSymbol(currency.iso3),
          }));

          const nepaliRupee = {
            iso3: "NPR",
            name: "Nepali Rupee",
            unit: 1,
            buy: "1.00",
            sell: "1.00",
            date: new Date().toISOString().split("T")[0],
            published_on: new Date().toISOString(),
            modified_on: new Date().toISOString(),
            symbol: "रु",
          };

          setLiveRateData([...finalData, nepaliRupee]);
          setSelectedCurrency({ sell: 1, symbol: nepaliRupee.symbol });
          setSelectedCurrencyiso(nepaliRupee.iso3);
        } else {
          setreloaddata((prev) => !prev);
        }
      } catch (error) {
        console.error("Error fetching live rate data:", error);
        setreloaddata((prev) => !prev);
      }
    };
    fetchLiveRates();
  }, [reloaddata]);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const { data } = await axios.get("https://api64.ipify.org?format=json");
        setDeviceDetails({ ...getDeviceDetails(), ip_address: data.ip });
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    fetchDeviceDetails();
  }, [reloaddata]);

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

  const sendDeviceDetailsToApi = async (details: DeviceDetails) => {
    if (details) {
      try {
        await userDevice(details);
      } catch (error) {
        toast.error("An error occurred while trying to log in. Please try again later.");
        console.error("Login error:", error);
      }
    }
  };

  const handleLogin = async (credentials: { email: string; password: string; remember: boolean }) => {
    try {
      const deviceDetails = getDeviceDetails();
      const res = await loginUser({ ...credentials, deviceDetails });

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
            const errorMessages = errors.non_field_errors ||
              errors.user ||
              errors.email || ["An unknown error occurred"];
            toast.error(errorMessages[0]);
          } else if (errorMsg) {
            toast.error(errorMsg);
            setuserLogin(user || null);
          }

          return;
        }
      }
      if (res.data) {
        const token = { ...res.data.token, remember: credentials.remember };
        storeToken(token);
        dispatch(setUserToken(token));
        toast.success("Login successful");
        setIsLoggedIn(true);
        sendDeviceDetailsToApi(deviceDetails);
      }
    } catch (error) {
      toast.error("An error occurred while trying to log in. Please try again later.");
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    dispatch(unSetUserToken());
    removeToken();
    signOut();
    toast.success("Logged out");
    setuserLogin(null);
    setIsLoggedIn(false);
  };

  const convertPrice = (price: number): { convertedPrice: number; symbol: string } => {
    if (selectedcurrency) {
      return { convertedPrice: parseFloat((price / selectedcurrency.sell).toFixed(2)), symbol: selectedcurrency.symbol };
    }
    return { convertedPrice: price, symbol: "" };
  };

  useEffect(() => {
    const { access_token } = getToken();
    if (status === "authenticated" && session?.access && session?.refresh && !access_token) {
      const token = { access: session.access, refresh: session.refresh, remember: true };
      storeToken(token);
      dispatch(setUserToken(token));
      toast.success("Login successful");
      setIsLoggedIn(true);
    }
  }, [session, status]);

  return (
    <AuthContext.Provider
      value={{
        setIsLoggedIn,
        setuserLogin,
        userLogin,
        isLoggedIn,
        handleLogin,
        handleLogout,
        liveratedata,
        handleSelectionChange,
        selectedcurrencyiso,
        convertPrice,
      }}
    >
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
