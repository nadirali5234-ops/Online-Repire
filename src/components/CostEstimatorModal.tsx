import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calculator, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { Service } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useServices } from '../context/ServicesContext';

interface EstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const CostEstimatorModal: React.FC<EstimatorProps> = ({
  isOpen,
  onClose,
  onBookService
}) => {
  const { services } = useServices();
  const { formatPriceRange, formatSinglePrice } = useCurrency();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || SERVICES_DATA[0].id);
  const [urgency, setUrgency] = useState<'standard' | 'same-day' | 'emergency'>('same-day');
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial'>('residential');
  const [apiEstimate, setApiEstimate] = useState<any>(null);

  useEffect(() => {
    if (!isOpen) return;
    const fetchEstimate = async () => {
      try {
        const res = await fetch('/api/estimator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceId: selectedServiceId, urgency, propertyType })
        });
        const data = await res.json();
        if (data.success) {
          setApiEstimate(data);
        }
      } catch (err) {
        console.error('Estimator API error:', err);
      }
    };
    fetchEstimate();
  }, [isOpen, selectedServiceId, urgency, propertyType]);

  if (!isOpen) return null;

  const selectedService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const getUrgencyMultiplier = () => {
    switch (urgency) {
      case 'emergency': return ' + RM50 Emergency Priority Surcharge';
      case 'same-day': return ' (Standard Same-Day Schedule)';
      default: return ' (Standard Next-Day Schedule)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Instant Repair Cost Estimator
            </h3>
            <p className="text-xs text-slate-400">
              Get an accurate estimate for your home or business repair in seconds.
            </p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-5 pt-2">
          
          {/* Step 1: Select Service */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              1. Select Repair Service Category:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between text-xs font-bold ${
                    selectedServiceId === s.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                  {selectedServiceId === s.id && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Urgency */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              2. Required Dispatch Urgency:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUrgency('standard')}
                className={`p-3 rounded-xl border text-center font-bold ${
                  urgency === 'standard'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Standard (Next Day)
              </button>
              <button
                type="button"
                onClick={() => setUrgency('same-day')}
                className={`p-3 rounded-xl border text-center font-bold ${
                  urgency === 'same-day'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Same-Day
              </button>
              <button
                type="button"
                onClick={() => setUrgency('emergency')}
                className={`p-3 rounded-xl border text-center font-bold ${
                  urgency === 'emergency'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Emergency (2 Hrs)
              </button>
            </div>
          </div>

          {/* Step 3: Property Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              3. Property Type:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPropertyType('residential')}
                className={`p-2.5 rounded-xl border text-center font-bold ${
                  propertyType === 'residential'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Residential (House/Apt)
              </button>
              <button
                type="button"
                onClick={() => setPropertyType('commercial')}
                className={`p-2.5 rounded-xl border text-center font-bold ${
                  propertyType === 'commercial'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                Commercial (Office/Shop)
              </button>
            </div>
          </div>

          {/* Estimate Breakdown Output */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-400">Estimated Price Range:</span>
              <span className="text-xl font-black text-amber-400">
                {formatPriceRange(selectedService.usdMin, selectedService.usdMax)}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span>Labor & Inspection:</span>
                <span className="font-bold text-white">{formatPriceRange(20, 35)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Parts & Material Allowance:</span>
                <span className="font-bold text-slate-300">{formatPriceRange(15, 45)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dispatch Fee:</span>
                <span className="font-semibold text-amber-300">
                  {urgency === 'emergency' ? `+${formatSinglePrice(15)} Emergency Surcharge` : 'Free Standard Dispatch'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-850 pt-2">
                <span>Warranty Coverage:</span>
                <span className="font-bold text-emerald-400">90-Day Written Warranty</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 italic">
              * Final quote will be confirmed on-site by our technician before work begins. No obligation to proceed if quote is not accepted!
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
          >
            Close
          </button>

          <button
            onClick={() => {
              onBookService(selectedService.id);
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
