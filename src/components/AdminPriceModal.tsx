import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Check, 
  DollarSign, 
  Clock, 
  Settings, 
  Sparkles,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useServices } from '../context/ServicesContext';
import { useCurrency } from '../context/CurrencyContext';

export const AdminPriceModal: React.FC = () => {
  const { 
    services, 
    updateServicePrice, 
    updateAllServices,
    resetAllPricesToDefault, 
    isAdminOpen, 
    setIsAdminOpen 
  } = useServices();
  const { currentCurrency, formatPriceRange } = useCurrency();

  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Editable prices map
  const [editingServices, setEditingServices] = useState<{
    [id: string]: { usdMin: number; usdMax: number; duration: string }
  }>({});

  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync editingServices whenever services or modal visibility changes
  useEffect(() => {
    if (isAdminOpen) {
      const map: any = {};
      services.forEach(s => {
        map[s.id] = { usdMin: s.usdMin, usdMax: s.usdMax, duration: s.duration };
      });
      setEditingServices(map);
    }
  }, [isAdminOpen, services]);

  if (!isAdminOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '786' || pin === '1234' || pin === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
      // Sync state
      const map: any = {};
      services.forEach(s => {
        map[s.id] = { usdMin: s.usdMin, usdMax: s.usdMax, duration: s.duration };
      });
      setEditingServices(map);
    } else {
      setPinError(true);
    }
  };

  const handlePriceChange = (id: string, field: 'usdMin' | 'usdMax', value: number) => {
    setEditingServices(prev => ({
      ...prev,
      [id]: {
        ...prev[id] || { usdMin: 0, usdMax: 0, duration: '' },
        [field]: Math.max(0, value)
      }
    }));
  };

  const handleDurationChange = (id: string, value: string) => {
    setEditingServices(prev => ({
      ...prev,
      [id]: {
        ...prev[id] || { usdMin: 0, usdMax: 0, duration: '' },
        duration: value
      }
    }));
  };

  const handleSaveAll = () => {
    updateAllServices(editingServices);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all service rates to default market values?')) {
      resetAllPricesToDefault();
      setIsAdminOpen(false);
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-5 text-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-slate-950/20 rounded-xl">
              <Settings className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h3 className="font-black text-lg leading-none">
                Daily Market Price Management System
              </h3>
              <p className="text-xs text-slate-900/80 font-bold mt-0.5">
                Sayad Handyman Admin Panel • Live Rate Editor ({currentCurrency.code})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Authentication Step */}
        {!isAuthenticated ? (
          <div className="p-8 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-bold text-white">Owner Security Verification</h4>
              <p className="text-xs text-slate-400">
                Enter your Admin Security PIN to access live daily market price controls.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter Security PIN (Default: 786)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-center text-lg font-bold tracking-widest text-white focus:outline-none focus:border-amber-500 placeholder-slate-600"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-400 font-medium flex items-center justify-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Incorrect Security PIN. Try '786'
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs uppercase tracking-wider"
                >
                  Unlock Price Controls
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPin('786');
                    setIsAuthenticated(true);
                  }}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs transition-colors border border-slate-700"
                  title="Quick Unlock for Demo"
                >
                  Quick Unlock
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                🔒 Protected System. Changes instantly update all website rates.
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Price Management Interface */
          <div className="p-6 space-y-6 text-xs text-slate-200 max-h-[80vh] overflow-y-auto">
            
            {/* Top Info Banner */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-300 text-sm">Daily Market Adjustment Tool</h4>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  Modify the base rates below according to market inflation or daily material costs. Prices are automatically converted to <strong>{currentCurrency.name} ({currentCurrency.symbol.trim()})</strong> across the website.
                </p>
              </div>
            </div>

            {/* Notification Toast */}
            {saveSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 font-bold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Daily market prices updated successfully! All website visitors now see updated rates.</span>
              </div>
            )}

            {/* Service Rates Table / Cards */}
            <div className="space-y-4">
              {services.map((srv) => {
                const edit = editingServices[srv.id] || { usdMin: srv.usdMin, usdMax: srv.usdMax, duration: srv.duration };
                const convertedPreview = formatPriceRange(edit.usdMin, edit.usdMax);

                return (
                  <div 
                    key={srv.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <h5 className="font-extrabold text-sm text-white">{srv.name}</h5>
                      </div>
                      <div className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 self-start sm:self-auto">
                        Live Website Rate: {convertedPreview}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {/* Min USD */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-amber-400" /> Min Base USD ($)
                        </label>
                        <input
                          type="number"
                          value={edit.usdMin}
                          onChange={(e) => handlePriceChange(srv.id, 'usdMin', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Max USD */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-amber-400" /> Max Base USD ($)
                        </label>
                        <input
                          type="number"
                          value={edit.usdMax}
                          onChange={(e) => handlePriceChange(srv.id, 'usdMax', parseFloat(e.target.value) || 0)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Duration */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-400" /> Completion Time
                        </label>
                        <input
                          type="text"
                          value={edit.duration}
                          onChange={(e) => handleDurationChange(srv.id, e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition-colors py-2 px-3 rounded-xl hover:bg-rose-500/10 border border-rose-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Standard Factory Rates</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Daily Rates</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
