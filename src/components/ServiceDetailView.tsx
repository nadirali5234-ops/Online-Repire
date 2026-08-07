import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  Tag,
  Sparkles
} from 'lucide-react';
import { Service } from '../types';
import { COMPANY_INFO, SERVICES_DATA } from '../data/servicesData';
import { useCurrency } from '../context/CurrencyContext';
import { useServices } from '../context/ServicesContext';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  onBookNow: (serviceId: string) => void;
  onSelectOtherService: (service: Service) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailProps> = ({
  service: initialService,
  onBack,
  onBookNow,
  onSelectOtherService
}) => {
  const { getServiceById, services } = useServices();
  const service = getServiceById(initialService.id) || initialService;
  const { formatPriceRange } = useCurrency();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappClean}?text=${encodeURIComponent(
    `Hello Sayad Handyman, I would like to book ${service.name}. Please provide me with more information.`
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-slate-900 text-white py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </button>
          <span className="text-xs text-amber-400 font-semibold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Sayad Handyman Service Catalog
          </span>
        </div>
      </div>

      {/* Hero Header Section for Individual Service */}
      <div className="relative bg-slate-950 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
                {service.category.toUpperCase()} REPAIR & MAINTENANCE
              </span>

              {/* Service title required in prompt */}
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {service.name}
              </h1>

              {/* Description required in prompt */}
              <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                {service.fullDesc}
              </p>

              {/* Price & Duration Stats */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>Est. Rate: <strong className="text-amber-400">{formatPriceRange(service.usdMin, service.usdMax)}</strong></span>
                </div>

                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Est. Completion: <strong className="text-white">{service.duration}</strong></span>
                </div>

                <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Warranty: <strong className="text-emerald-400">90-Day Guarantee</strong></span>
                </div>
              </div>

              {/* CTA Action Buttons requested in prompt (Book Now, Call Now, WhatsApp) */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onBookNow(service.id)}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/25 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Now</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm py-3.5 px-5 rounded-xl border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Now</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm py-3.5 px-5 rounded-xl shadow-lg shadow-emerald-600/20 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Professional Image requested in prompt */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                  <span className="font-semibold text-white">Genuine Factory Parts</span>
                  <span className="text-amber-400 font-bold">Sayad Handyman Verified</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Common Problems & Symptoms Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Common Problems We Fix for {service.name}
              </h2>
              <p className="text-sm text-slate-600">
                If you are experiencing any of these symptoms, our technicians can diagnose and repair it today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.commonProblems.map((prob, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2 hover:border-amber-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">
                    {prob.issue}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Symptom #{idx + 1}
                  </span>
                </div>
                <p className="text-xs font-semibold text-amber-600">
                  ⚠️ {prob.symptom}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {prob.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Solution Section */}
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-slate-950 font-bold">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">
                Our Professional Repair Solution
              </h2>
              <p className="text-sm text-slate-300">
                How Sayad Handyman resolves {service.name} issues safely and permanently:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.ourSolution.map((sol, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-slate-800 border border-slate-700"
              >
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">{sol}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits & Why Choose Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Key Benefits */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> Service Benefits
            </h3>
            <ul className="space-y-3">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us for this Service */}
          <div className="bg-amber-50/80 p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" /> Why Choose Sayad Handyman
            </h3>
            <ul className="space-y-3">
              {service.whyChooseUs.map((w, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* FAQs Accordion Section */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900">
              Frequently Asked Questions about {service.name}
            </h3>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-4 font-bold text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA Box */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-4 border border-slate-800 shadow-2xl">
          <h3 className="text-2xl font-black text-white">Ready to Schedule Your {service.name}?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Book online in under 60 seconds or contact our customer support team for an instant quote.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onBookNow(service.id)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm py-3.5 px-8 rounded-xl shadow-lg transition-colors"
            >
              Book Service Now
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl border border-slate-700 transition-colors"
            >
              Call {COMPANY_INFO.phone}
            </a>
          </div>
        </div>

        {/* Other Services Selector */}
        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Explore Other Repair Services
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SERVICES_DATA.filter(s => s.id !== service.id).map((other) => (
              <button
                key={other.id}
                onClick={() => onSelectOtherService(other)}
                className="p-3 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl text-left transition-all"
              >
                <p className="text-xs font-bold text-slate-900 line-clamp-1">{other.name}</p>
                <p className="text-[10px] text-amber-600 font-semibold mt-1">View Details →</p>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
