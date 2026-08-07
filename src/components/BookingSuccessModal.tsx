import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Wrench, 
  ShieldCheck,
  Tag
} from 'lucide-react';
import { BookingConfirmation } from '../types';
import { SERVICES_DATA, COMPANY_INFO } from '../data/servicesData';

interface BookingSuccessModalProps {
  confirmation: BookingConfirmation | null;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  confirmation,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!confirmation) return null;

  const service = SERVICES_DATA.find(s => s.id === confirmation.serviceId);

  const copyRefCode = () => {
    navigator.clipboard.writeText(confirmation.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = `Hello Sayad Handyman, I just submitted a booking online!%0A%0A` +
    `📌 *Reference ID:* ${confirmation.id}%0A` +
    `👤 *Name:* ${confirmation.fullName}%0A` +
    `📞 *Phone:* ${confirmation.phone}%0A` +
    `🛠️ *Service:* ${service?.name || confirmation.serviceId}%0A` +
    `📅 *Preferred Date:* ${confirmation.preferredDate || 'Earliest Available'} (${confirmation.preferredTime})%0A` +
    `📍 *Address:* ${confirmation.address}%0A%0A` +
    `Please confirm technician availability. Thank you!`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-300">
        
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/30 hover:bg-slate-900/50 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl font-black tracking-tight">Booking Submitted!</h3>
          <p className="text-xs text-emerald-100 mt-1 font-medium">
            Thank you, {confirmation.fullName}! Your repair ticket is registered.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-slate-200 text-xs">
          
          {/* Reference Number Box */}
          <div className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Booking Reference ID
              </span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {confirmation.id}
              </span>
            </div>
            <button
              onClick={copyRefCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Booking Summary Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              Appointment Summary
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" /> Service Requested
                </div>
                <p className="font-bold text-white text-xs truncate">
                  {service?.name || 'General Repair'}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Tag className="w-3.5 h-3.5 text-amber-400" /> Estimated Rate
                </div>
                <p className="font-bold text-amber-400 text-xs">
                  {confirmation.totalEstimate || '$40 - $180'}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" /> Preferred Date
                </div>
                <p className="font-bold text-white text-xs">
                  {confirmation.preferredDate || 'Earliest Available'}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-blue-400" /> Time Window
                </div>
                <p className="font-bold text-white text-xs truncate">
                  {confirmation.preferredTime}
                </p>
              </div>
            </div>

            {/* Address & Contact */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Service Address
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {confirmation.address}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" /> {confirmation.fullName}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> {confirmation.phone}
              </span>
            </div>
          </div>

          {/* Thank You & Guarantee Note */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-2.5 text-amber-200 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong>What Happens Next?</strong> Our dispatch coordinator will contact you within 15 minutes to confirm exact technician arrival. All services include our 90-day written warranty.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappClean}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm on WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-colors border border-slate-700"
            >
              Close / Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
