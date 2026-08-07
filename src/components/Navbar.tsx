import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MessageCircle, 
  Wrench, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Calendar,
  Calculator
} from 'lucide-react';
import { PageView, Service } from '../types';
import { COMPANY_INFO, SERVICES_DATA } from '../data/servicesData';
import { CurrencySelector } from './CurrencySelector';
import { useServices } from '../context/ServicesContext';
import { Settings } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  openBookingWithService?: (serviceId?: string) => void;
  openEstimator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  setSelectedService,
  openBookingWithService,
  openEstimator,
}) => {
  const { setIsAdminOpen } = useServices();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setSelectedService(null);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappClean}?text=${encodeURIComponent(
    "Hello Sayad Handyman, I would like to book a service. Please provide me with more information."
  )}`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Licensed & Insured Handyman Service
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" /> {COMPANY_INFO.hours}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium flex-wrap justify-center sm:justify-end">
            <CurrencySelector />
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors font-bold text-[11px]"
              title="Admin Daily Market Price Management"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Rates</span>
            </button>
            <a 
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" /> {COMPANY_INFO.phone}
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Fast Response
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div 
        className={`bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg py-3' : 'shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
                <Wrench className="w-6 h-6 text-slate-950 transform group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 block leading-none">
                  SAYAD <span className="text-amber-600">HANDYMAN</span>
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                  Home & Technical Repairs
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
              <button 
                onClick={() => handleNavClick('home')}
                className={`transition-colors hover:text-amber-600 ${
                  currentPage === 'home' ? 'text-amber-600 font-bold border-b-2 border-amber-600 pb-1' : ''
                }`}
              >
                Home
              </button>

              <button 
                onClick={() => handleNavClick('about')}
                className={`transition-colors hover:text-amber-600 ${
                  currentPage === 'about' ? 'text-amber-600 font-bold border-b-2 border-amber-600 pb-1' : ''
                }`}
              >
                About Us
              </button>

              {/* Services Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1 transition-colors hover:text-amber-600 ${
                    currentPage === 'services' || currentPage === 'service-detail'
                      ? 'text-amber-600 font-bold border-b-2 border-amber-600 pb-1'
                      : ''
                  }`}
                >
                  Services <ChevronDown className="w-4 h-4" />
                </button>

                {servicesDropdownOpen && (
                  <div 
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 ring-1 ring-slate-900/5 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="p-2 border-b border-slate-100">
                      <button 
                        onClick={() => handleNavClick('services')}
                        className="w-full text-left font-bold text-amber-600 hover:text-amber-700 text-xs uppercase tracking-wider p-2 rounded-lg hover:bg-amber-50"
                      >
                        View All 7 Services →
                      </button>
                    </div>
                    <div className="py-1">
                      {SERVICES_DATA.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(service)}
                          className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-600 rounded-xl transition-colors flex items-center justify-between group"
                        >
                          <span>{service.name}</span>
                          <span className="text-xs text-slate-400 group-hover:text-amber-500 font-normal">
                            View
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={openEstimator}
                className="flex items-center gap-1 text-slate-700 hover:text-amber-600 transition-colors"
              >
                <Calculator className="w-4 h-4 text-blue-600" /> Cost Estimator
              </button>

              <button 
                onClick={() => handleNavClick('tips')}
                className={`transition-colors hover:text-amber-600 ${
                  currentPage === 'tips' ? 'text-amber-600 font-bold border-b-2 border-amber-600 pb-1' : ''
                }`}
              >
                Expert Tips
              </button>

              <button 
                onClick={() => handleNavClick('booking')}
                className={`transition-colors hover:text-amber-600 ${
                  currentPage === 'booking' ? 'text-amber-600 font-bold border-b-2 border-amber-600 pb-1' : ''
                }`}
              >
                Booking
              </button>

              <button 
                onClick={() => handleNavClick('contact')}
                className={`transition-colors hover:text-amber-600 ${
                  currentPage === 'contact' ? 'text-amber-600 font-bold border-b-2 border-amber-600 pb-1' : ''
                }`}
              >
                Contact Us
              </button>
            </nav>

            {/* Right Action CTA Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="hidden xl:flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 py-2.5 px-4 rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <button
                onClick={() => {
                  if (openBookingWithService) {
                    openBookingWithService();
                  } else {
                    handleNavClick('booking');
                  }
                }}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm py-2.5 px-5 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Service</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`text-left py-2.5 px-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 ${
                  currentPage === 'home' ? 'bg-amber-50 text-amber-600 font-bold' : ''
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`text-left py-2.5 px-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 ${
                  currentPage === 'about' ? 'bg-amber-50 text-amber-600 font-bold' : ''
                }`}
              >
                About Us
              </button>

              <div className="py-2 px-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
                  <span className="font-bold text-xs uppercase text-slate-500 tracking-wider">
                    Our Services
                  </span>
                  <button 
                    onClick={() => handleNavClick('services')}
                    className="text-xs text-amber-600 font-bold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleServiceSelect(srv)}
                      className="text-left py-2 px-2 text-sm text-slate-700 hover:text-amber-600 flex items-center justify-between"
                    >
                      <span>{srv.name}</span>
                      <span className="text-xs text-amber-600 font-semibold">→</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  openEstimator();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2.5 px-4 rounded-xl font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" /> Instant Cost Estimator
                </span>
                <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">New</span>
              </button>

              <button
                onClick={() => handleNavClick('tips')}
                className={`text-left py-2.5 px-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 ${
                  currentPage === 'tips' ? 'bg-amber-50 text-amber-600 font-bold' : ''
                }`}
              >
                Expert Tips & DIY Advice
              </button>

              <button
                onClick={() => handleNavClick('booking')}
                className={`text-left py-2.5 px-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 ${
                  currentPage === 'booking' ? 'bg-amber-50 text-amber-600 font-bold' : ''
                }`}
              >
                Book Appointment
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`text-left py-2.5 px-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 ${
                  currentPage === 'contact' ? 'bg-amber-50 text-amber-600 font-bold' : ''
                }`}
              >
                Contact Us
              </button>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${COMPANY_INFO.phoneClean}`}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold text-xs py-3 px-3 rounded-xl"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold text-xs py-3 px-3 rounded-xl"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
