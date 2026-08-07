import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service } from '../types';
import { SERVICES_DATA } from '../data/servicesData';

interface ServicesContextType {
  services: Service[];
  updateServicePrice: (serviceId: string, newMin: number, newMax: number, newDuration?: string) => void;
  updateAllServices: (updatedMap: { [id: string]: { usdMin: number; usdMax: number; duration: string } }) => void;
  resetAllPricesToDefault: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  getServiceById: (serviceId: string) => Service;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const STORAGE_KEY = 'sayad_services_data_v2';

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved prices from localStorage:', e);
    }
    return SERVICES_DATA;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Save to localStorage whenever services change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch (e) {
      console.error('Failed to save services to localStorage:', e);
    }
  }, [services]);

  const updateServicePrice = (
    serviceId: string, 
    newMin: number, 
    newMax: number, 
    newDuration?: string
  ) => {
    setServices(prev => {
      const updated = prev.map(s => {
        if (s.id === serviceId) {
          return {
            ...s,
            usdMin: newMin,
            usdMax: newMax,
            estimatedPrice: `$${newMin} - $${newMax}`,
            ...(newDuration ? { duration: newDuration } : {})
          };
        }
        return s;
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateAllServices = (updatedMap: { [id: string]: { usdMin: number; usdMax: number; duration: string } }) => {
    setServices(prev => {
      const updated = prev.map(s => {
        if (updatedMap[s.id]) {
          const item = updatedMap[s.id];
          return {
            ...s,
            usdMin: item.usdMin,
            usdMax: item.usdMax,
            estimatedPrice: `$${item.usdMin} - $${item.usdMax}`,
            duration: item.duration || s.duration
          };
        }
        return s;
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save updated services:', e);
      }
      return updated;
    });
  };

  const resetAllPricesToDefault = () => {
    setServices(SERVICES_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const getServiceById = (serviceId: string): Service => {
    return services.find(s => s.id === serviceId) || services[0];
  };

  return (
    <ServicesContext.Provider value={{
      services,
      updateServicePrice,
      updateAllServices,
      resetAllPricesToDefault,
      isAdminOpen,
      setIsAdminOpen,
      getServiceById
    }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

