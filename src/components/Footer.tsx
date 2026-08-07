import React from 'react';
import { 
  Wrench, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { PageView, Service } from '../types';
import { COMPANY_INFO, SERVICES_DATA } from '../data/servicesData';
import { CurrencySelector } from './CurrencySelector';
import { useServices } from '../context/ServicesContext';
import { Settings } from 'lucide-react';

interface FooterProps {
  onNavClick: (page: PageView) => void;
  onServiceSelect: (service: Service) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  onServiceSelect
}) => {
  const { setIsAdminOpen } = useServices();
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappClean}?text=${encodeURIComponent(
    "Hello Sayad Handyman, I would like to book a service. Please provide me with more information."
  )}`;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <button 
              onClick={() => onNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Wrench className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-none">
                  SAYAD <span className="text-amber-500">HANDYMAN</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Home & Technical Repair Services
                </span>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed">
              Sayad Handyman provides reliable, professional, and affordable repair and maintenance services across appliances, IT, plumbing, waterproofing, and structural installations with 100% guaranteed quality workmanship.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Licensed, Insured & Fully Vetted Technicians</span>
            </div>

            {/* Social Media Icons - All Working Links */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Follow Us & Social Media:
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={COMPANY_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 flex items-center justify-center transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Account"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 flex items-center justify-center font-black text-xs transition-colors"
                  title="TikTok"
                >
                  🎵
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Page"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-slate-400 hover:text-amber-400 flex items-center justify-center font-bold text-xs transition-colors"
                  title="LinkedIn"
                >
                  in
                </a>
                <a
                  href={COMPANY_INFO.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Direct"
                  className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <CurrencySelector variant="dark" />
            </div>
          </div>

          {/* Col 2: Services Links requested in prompt */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Our 7 Repair Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onServiceSelect(srv)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-slate-400"
                  >
                    <ChevronRight className="w-3 h-3 text-amber-500" />
                    <span>{srv.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation requested in prompt */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-amber-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-amber-400 transition-colors">
                  All Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('estimator')} className="hover:text-amber-400 transition-colors">
                  Cost Estimator
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('tips')} className="hover:text-amber-400 transition-colors">
                  Expert Tips & DIY
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('booking')} className="hover:text-amber-400 transition-colors">
                  Book Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('contact')} className="hover:text-amber-400 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info & WhatsApp requested in prompt */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase text-white tracking-wider border-b border-slate-800 pb-2">
              Contact Information
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <a href={`tel:${COMPANY_INFO.phoneClean}`} className="hover:text-white font-semibold">
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp Direct Chat
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Local SEO Keyword Tag Footer Strip requested in prompt */}
        <div className="pt-8 border-t border-slate-800/80">
          <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-2">
            Local Handyman & Repair Keywords:
          </p>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
            {[
              'Handyman services',
              'Refrigerator repair',
              'Washing machine repair',
              'Aircond service',
              'Laptop repair',
              'Computer repair',
              'Plumbing services',
              'Waterproofing services',
              'Awning installation',
              'Emergency home repair',
              'Electrical & Appliance technician',
              'Fast handyman near me'
            ].map((kw, i) => (
              <span key={i} className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright notice requested in prompt */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Sayad Handyman. All Rights Reserved. Professional Home & Technical Repair Services.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Daily Prices</span>
            </button>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Workmanship Warranty</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
