"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

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
  liveratedata: CurrencyDataArray | null;
  handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedcurrencyiso: string;
  convertPrice: (price: number) => { convertedPrice: number; symbol: string };
  convertPriceToCurrency: (
    price: number,
    iso3: string
  ) => { convertedPrice: number; symbol: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const [liveratedata, setLiveRateData] = useState<CurrencyDataArray | null>(
    null
  );
  const [reloaddata, setreloaddata] = useState<boolean>(false);
  const [selectedcurrency, setSelectedCurrency] = useState<{
    sell: number;
    symbol: string;
  } | null>(null);
  const [selectedcurrencyiso, setSelectedCurrencyiso] = useState<string>("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIso3 = e.target.value;
    if (selectedIso3 && liveratedata) {
      const selectedCurrency = liveratedata.find(
        (currency) => currency.iso3 === selectedIso3
      );
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
        const { data } = await axios.get(
          "https://www.nrb.org.np/api/forex/v1/app-rate"
        );
        const currencyData = Array.isArray(data) ? data : JSON.parse(data.replace(/.*\[(.*)\]/s, "[$1]"));
        if (currencyData) {
          const requiredCurrencies = ["INR", "USD", "CNY", "AUD"];
          const filteredData = currencyData.filter((currency: CurrencyData) =>
            requiredCurrencies.includes(currency.iso3)
          );
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

  const convertPrice = (
    price: number
  ): { convertedPrice: number; symbol: string } => {
    if (selectedcurrency) {
      return {
        convertedPrice: parseFloat((price / selectedcurrency.sell).toFixed(2)),
        symbol: selectedcurrency.symbol,
      };
    }
    return { convertedPrice: price, symbol: "" };
  };

  const convertPriceToCurrency = (
    price: number,
    iso3: string
  ): { convertedPrice: number; symbol: string } => {
    if (liveratedata) {
      const desiredCurrency = liveratedata.find(
        (currency) => currency.iso3 === iso3
      );
      if (desiredCurrency) {
        return {
          convertedPrice: parseFloat(
            (price / parseFloat(desiredCurrency.sell)).toFixed(2)
          ),
          symbol: desiredCurrency.symbol,
        };
      }
    }
    return { convertedPrice: price, symbol: "" };
  };

  return (
    <AuthContext.Provider
      value={{
        liveratedata,
        handleSelectionChange,
        selectedcurrencyiso,
        convertPrice,
        convertPriceToCurrency,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
