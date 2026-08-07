import React, { useState } from 'react';
import { 
  Calendar, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Search, 
  Star,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';
import { Service } from '../types';
import { useServices } from '../context/ServicesContext';

interface HeroProps {
  onBookClick: () => void;
  onServiceSelect: (service: Service) => void;
  onOpenEstimator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onBookClick, 
  onServiceSelect,
  onOpenEstimator 
}) => {
  const { services } = useServices();
  const [searchQuery, setSearchQuery] = useState('');

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappClean}?text=${encodeURIComponent(
    "Hello Sayad Handyman, I would like to book a service. Please provide me with more information."
  )}`;

  const filteredServices = searchQuery.trim() 
    ? services.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.commonProblems.some(p => p.issue.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-16 lg:py-24">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/sayad_hero_handyman_1786128061674.jpg"
          alt="Sayad Handyman Repair Services Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Top Rating Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold backdrop-blur-md">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>4.9 / 5.0 Rating by 480+ Homeowners</span>
            </div>

            {/* Main Headline & Subheading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Reliable Handyman & Repair Services <span className="text-amber-500 underline decoration-amber-500/30">You Can Trust</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                Professional repair, installation, plumbing and waterproofing services for your home and business. Fast turnaround & 100% guaranteed workmanship.
              </p>
            </div>

            {/* Quick Diagnostic Search Box */}
            <div className="relative max-w-xl">
              <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
                <Search className="w-5 h-5 text-amber-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What needs fixing today? (e.g. Fridge, Aircond, Leak, Plumbing)"
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  onClick={onOpenEstimator}
                  className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shrink-0"
                >
                  <Wrench className="w-3.5 h-3.5" /> Estimate Cost
                </button>
              </div>

              {/* Instant Search Results Dropdown */}
              {searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-30 max-h-60 overflow-y-auto">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          onServiceSelect(srv);
                          setSearchQuery('');
                        }}
                        className="w-full text-left p-3 hover:bg-slate-800 transition-colors border-b border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-bold text-amber-400">{srv.name}</p>
                          <p className="text-xs text-slate-400 line-clamp-1">{srv.shortDesc}</p>
                        </div>
                        <span className="text-xs text-slate-300 font-semibold bg-slate-800 px-2 py-1 rounded-lg">
                          View Repair Details →
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-xs text-slate-400 text-center">
                      No exact match found. Call us directly or book custom handyman request!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CTA Buttons Requested in Prompt */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base py-4 px-8 rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Service</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-base py-4 px-6 rounded-2xl border border-slate-700 transition-all transform hover:-translate-y-1"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call Now</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Key Trust Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Same-Day Response</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>90-Day Parts Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Transparent Flat Pricing</span>
              </div>
            </div>
          </div>

          {/* Right Hero Feature Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    Quick Service Booking
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Need Emergency Repair?
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
              </div>

              {/* Quick Feature Highlights list */}
              <div className="space-y-4 mb-6">
                {services.slice(0, 4).map((s) => (
                  <div
                    key={s.id}
                    onClick={() => onServiceSelect(s)}
                    className="p-3.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                          {s.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Est: ${s.usdMin} - ${s.usdMax}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onBookClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Inspection & Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
