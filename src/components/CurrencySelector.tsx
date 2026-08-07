import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useCurrency, CURRENCIES } from '../context/CurrencyContext';

export const CurrencySelector: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'dark' }) => {
  const { currentCurrency, setCurrencyCode } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLight = variant === 'light';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all border ${
          isLight
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
            : 'bg-slate-800/90 hover:bg-slate-700 text-amber-400 border-slate-700 shadow-md'
        }`}
        aria-label="Select Country Currency"
      >
        <Globe className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-base leading-none">{currentCurrency.flag}</span>
        <span>{currentCurrency.code} ({currentCurrency.symbol.trim()})</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl ring-1 ring-black ring-opacity-5 z-50 p-2 text-xs divide-y divide-slate-800 animate-in fade-in zoom-in-95">
          <div className="p-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Select Currency</span>
            <span className="text-amber-400 font-normal">Auto Convert</span>
          </div>
          <div className="pt-1 max-h-64 overflow-y-auto space-y-0.5">
            {CURRENCIES.map((curr) => {
              const isSelected = curr.code === currentCurrency.code;
              return (
                <button
                  key={curr.code}
                  onClick={() => {
                    setCurrencyCode(curr.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{curr.flag}</span>
                    <div>
                      <div className="font-semibold">{curr.code} - {curr.symbol}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{curr.name}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
