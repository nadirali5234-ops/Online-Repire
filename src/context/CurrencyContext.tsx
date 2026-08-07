import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateVsUsd: number; // Conversion multiplier from base USD
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs ', flag: '🇵🇰', rateVsUsd: 278.0 },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateVsUsd: 1.0 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM ', flag: '🇲🇾', rateVsUsd: 4.45 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED ', flag: '🇦🇪', rateVsUsd: 3.67 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR ', flag: '🇸🇦', rateVsUsd: 3.75 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateVsUsd: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateVsUsd: 0.78 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rateVsUsd: 83.5 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rateVsUsd: 1.37 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rateVsUsd: 1.52 }
];

interface CurrencyContextType {
  currentCurrency: CurrencyInfo;
  setCurrencyCode: (code: string) => void;
  formatPriceRange: (usdMin: number, usdMax: number) => string;
  formatSinglePrice: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyInfo>(() => {
    const saved = localStorage.getItem('sayad_currency');
    const found = CURRENCIES.find(c => c.code === saved);
    return found || CURRENCIES[0]; // Default to PKR
  });

  const setCurrencyCode = (code: string) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (found) {
      setCurrentCurrency(found);
      localStorage.setItem('sayad_currency', code);
    }
  };

  const formatSinglePrice = (usdAmount: number): string => {
    const converted = Math.round(usdAmount * currentCurrency.rateVsUsd);
    // Format large numbers with commas
    const formattedNum = converted.toLocaleString('en-US');
    return `${currentCurrency.symbol}${formattedNum}`;
  };

  const formatPriceRange = (usdMin: number, usdMax: number): string => {
    const minConverted = Math.round(usdMin * currentCurrency.rateVsUsd);
    const maxConverted = Math.round(usdMax * currentCurrency.rateVsUsd);
    
    return `${currentCurrency.symbol}${minConverted.toLocaleString()} - ${currentCurrency.symbol}${maxConverted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      setCurrencyCode,
      formatPriceRange,
      formatSinglePrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
