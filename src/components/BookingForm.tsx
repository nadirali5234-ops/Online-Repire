import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Wrench, 
  CheckCircle2, 
  Send, 
  MessageCircle,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';
import { BookingData, BookingConfirmation } from '../types';
import { SERVICES_DATA, COMPANY_INFO } from '../data/servicesData';
import { BookingSuccessModal } from './BookingSuccessModal';
import { useServices } from '../context/ServicesContext';

interface BookingFormProps {
  preselectedServiceId?: string;
  onSuccess?: (confirmation: BookingConfirmation) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  preselectedServiceId,
  onSuccess
}) => {
  const { services, getServiceById } = useServices();
  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    serviceId: preselectedServiceId || services[0]?.id || SERVICES_DATA[0].id,
    preferredDate: '',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)',
    address: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  // Set min date to today
  const todayStr = new Date().toISOString().split('T')[0];

  const [trackQuery, setTrackQuery] = useState('');
  const [trackedResults, setTrackedResults] = useState<any[] | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [activeTab, setActiveTab] = useState<'book' | 'track'>('book');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success && data.booking) {
        const b = data.booking;
        const newConfirmation: BookingConfirmation = {
          id: b.id,
          fullName: b.fullName,
          phone: b.phone,
          email: b.email || '',
          serviceId: b.serviceId,
          preferredDate: b.preferredDate,
          preferredTime: b.preferredTime,
          address: b.address,
          message: b.message || '',
          createdAt: new Date(b.createdAt).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          status: b.status,
          totalEstimate: b.totalEstimate
        };

        setConfirmation(newConfirmation);
        if (onSuccess) {
          onSuccess(newConfirmation);
        }
      } else {
        alert(data.error || 'Failed to record booking on backend server.');
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      // Fallback local creation if network error
      const selectedServiceObj = SERVICES_DATA.find(s => s.id === formData.serviceId);
      const newConfirmation: BookingConfirmation = {
        ...formData,
        id: `SH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'Confirmed',
        totalEstimate: selectedServiceObj?.estimatedPrice || 'Diagnostic Quote'
      };
      setConfirmation(newConfirmation);
      if (onSuccess) {
        onSuccess(newConfirmation);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    setIsTracking(true);

    try {
      const res = await fetch(`/api/bookings/track?query=${encodeURIComponent(trackQuery.trim())}`);
      const data = await res.json();
      if (data.success) {
        setTrackedResults(data.bookings);
      } else {
        setTrackedResults([]);
      }
    } catch (err) {
      console.error('Error tracking booking:', err);
      setTrackedResults([]);
    } finally {
      setIsTracking(false);
    }
  };

  const getWhatsAppBookingText = (conf: BookingConfirmation) => {
    const srvName = SERVICES_DATA.find(s => s.id === conf.serviceId)?.name || conf.serviceId;
    return `Hello Sayad Handyman, I have submitted a service request!\n\n` +
      `📌 Booking Ref: ${conf.id}\n` +
      `👤 Name: ${conf.fullName}\n` +
      `📞 Phone: ${conf.phone}\n` +
      `🛠️ Service: ${srvName}\n` +
      `📅 Date: ${conf.preferredDate}\n` +
      `⏰ Time: ${conf.preferredTime}\n` +
      `📍 Address: ${conf.address}\n` +
      `💬 Problem Note: ${conf.message || 'None'}\n\n` +
      `Please confirm my technician appointment schedule. Thank you!`;
  };

  const copyRefToClipboard = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="booking-section" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full inline-block mb-3">
            Schedule a Repair Visit
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Book an Inspection & Service
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Fill out the request form below. Our team will contact you within 15 minutes to confirm technician arrival!
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'book'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Book New Appointment
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'track'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Track Existing Booking Status
            </button>
          </div>
        </div>

        {/* Tab 1: Track Booking Status Search */}
        {activeTab === 'track' ? (
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-2">
              <h3 className="text-xl font-black text-white">Track Your Appointment</h3>
              <p className="text-xs text-slate-300">
                Enter your Booking Reference ID (e.g. <span className="text-amber-400">SH-2026-1042</span>) or Phone Number to check live technician dispatch status.
              </p>
            </div>

            <form onSubmit={handleTrackBooking} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="text"
                required
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                placeholder="Reference ID or Phone (e.g. SH-2026-1042 or 012-345)"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={isTracking}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors disabled:opacity-50"
              >
                {isTracking ? 'Searching...' : 'Search Status'}
              </button>
            </form>

            {/* Results Output */}
            {trackedResults && (
              <div className="pt-4 space-y-4 border-t border-slate-700 max-w-2xl mx-auto">
                {trackedResults.length > 0 ? (
                  trackedResults.map((item) => (
                    <div key={item.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">REF: <span className="text-amber-400 text-sm font-extrabold">{item.id}</span></span>
                        <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                          item.status === 'Confirmed' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          item.status === 'Technician Dispatched' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          'bg-slate-700 text-slate-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400">Customer:</p>
                          <p className="font-bold text-white">{item.fullName}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Service:</p>
                          <p className="font-bold text-white">{item.serviceName}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Assigned Tech:</p>
                          <p className="font-bold text-amber-400">{item.assignedTechnician || 'Master Tech Sayad'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Date/Time:</p>
                          <p className="font-semibold text-slate-200">{item.preferredDate} ({item.preferredTime})</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Estimated Rate:</p>
                          <p className="font-bold text-emerald-400">{item.totalEstimate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Estimated Arrival:</p>
                          <p className="font-semibold text-amber-300">{item.estimatedArrival}</p>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 bg-slate-800 p-2.5 rounded-xl border border-slate-750">
                        📍 <strong>Location:</strong> {item.address}
                        {item.message && <div className="mt-1 text-slate-300">💬 <strong>Note:</strong> {item.message}</div>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs bg-slate-900 rounded-2xl border border-slate-700">
                    No booking record found for "{trackQuery}". Please double check your booking reference code or phone number.
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Modal Overlay Triggered on Submission */}
            <BookingSuccessModal
              confirmation={confirmation}
              onClose={() => setConfirmation(null)}
            />

            {/* Main Booking Form */}
            <form 
              onSubmit={handleSubmit}
              className="bg-slate-800/90 rounded-3xl border border-slate-700 p-6 sm:p-10 shadow-2xl space-y-6"
            >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahmad Razak"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" /> Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +60 12-345 6789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              {/* Select Service (Required in prompt) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" /> Select Service *
                </label>
                <select
                  required
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                >
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.id} className="bg-slate-900 text-white">
                      {srv.name} ({srv.estimatedPrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400" /> Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              {/* Preferred Time */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Preferred Time *
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                >
                  <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="Evening (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                  <option value="Emergency Urgent Visit">Emergency Urgent Visit (Asap)</option>
                </select>
              </div>

            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Service Location Address *
              </label>
              <input
                type="text"
                required
                placeholder="Unit, Street name, Taman/District, Postcode & City"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
              />
            </div>

            {/* Message/Problem Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" /> Message / Problem Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe the issue (e.g. Fridge fan noisy, Washing machine not draining, AC water dripping...)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
              />
            </div>

            {/* Submit Request Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base tracking-wide shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Request Now</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Zero upfront fee required. Pay after technician completes inspection and repair!
            </p>
          </form>
        </>
        )}

      </div>
    </section>
  );
};
