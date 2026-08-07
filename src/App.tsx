import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { ServicesProvider } from './context/ServicesContext';
import { PageView, Service } from './types';
import { SERVICES_DATA } from './data/servicesData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BookingForm } from './components/BookingForm';
import { ServiceDetailView } from './components/ServiceDetailView';
import { ContactSection } from './components/ContactSection';
import { CostEstimatorModal } from './components/CostEstimatorModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Testimonials } from './components/Testimonials';
import { ExpertTipsSection } from './components/ExpertTipsSection';
import { Footer } from './components/Footer';
import { SEOMeta } from './components/SEOMeta';
import { AdminPriceModal } from './components/AdminPriceModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [preselectedBookingServiceId, setPreselectedBookingServiceId] = useState<string | undefined>(undefined);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedBookingServiceId(serviceId);
    }
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEstimator = () => {
    setIsEstimatorOpen(true);
  };

  return (
    <CurrencyProvider>
      <ServicesProvider>
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
          
          {/* Dynamic SEO Metadata & Schema Injection */}
          <SEOMeta currentPage={currentPage} selectedService={selectedService} />

          {/* Persistent Top Navigation Bar */}
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            openBookingWithService={handleOpenBooking}
            openEstimator={handleOpenEstimator}
          />

        {/* Main Content Render Area */}
        <main className="flex-grow">
          
          {/* PAGE 1: HOME PAGE */}
          {currentPage === 'home' && (
            <>
              <Hero
                onBookClick={() => handleOpenBooking()}
                onServiceSelect={handleServiceSelect}
                onOpenEstimator={handleOpenEstimator}
              />

              <ServicesGrid
                onServiceSelect={handleServiceSelect}
                onBookService={handleOpenBooking}
              />

              <AboutSection />

              <WhyChooseUs />

              <Testimonials />

              <ExpertTipsSection
                onBookService={handleOpenBooking}
                onSelectService={handleServiceSelect}
              />

              <BookingForm
                preselectedServiceId={preselectedBookingServiceId}
              />

              <ContactSection />
            </>
          )}

          {/* PAGE 2: ABOUT US PAGE */}
          {currentPage === 'about' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 rounded-full inline-block border border-amber-500/30">
                    Who We Are
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-white">
                    About Sayad Handyman
                  </h1>
                  <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                    Providing professional, reliable, and affordable repair and maintenance services since 2016.
                  </p>
                </div>
              </div>

              <AboutSection />
              <WhyChooseUs />
              <Testimonials />
              <BookingForm preselectedServiceId={preselectedBookingServiceId} />
            </div>
          )}

          {/* PAGE 3: SERVICES CATALOG PAGE */}
          {currentPage === 'services' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 rounded-full inline-block border border-amber-500/30">
                    Full Service Catalog
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-white">
                    All 7 Repair & Technical Services
                  </h1>
                  <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                    Click on any service card below to inspect diagnostic solutions, warranty details, and instant booking rates.
                  </p>
                </div>
              </div>

              <ServicesGrid
                onServiceSelect={handleServiceSelect}
                onBookService={handleOpenBooking}
              />

              <BookingForm preselectedServiceId={preselectedBookingServiceId} />
            </div>
          )}

          {/* PAGE 4: INDIVIDUAL SERVICE DETAILS PAGE */}
          {currentPage === 'service-detail' && selectedService && (
            <div className="animate-in fade-in duration-300">
              <ServiceDetailView
                service={selectedService}
                onBack={() => {
                  setCurrentPage('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBookNow={(srvId) => handleOpenBooking(srvId)}
                onSelectOtherService={handleServiceSelect}
              />
            </div>
          )}

          {/* PAGE 5: BOOKING PAGE */}
          {currentPage === 'booking' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 rounded-full inline-block border border-amber-500/30">
                    Online Service Booking
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-white">
                    Book Your Technician Appointment
                  </h1>
                  <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                    Select your preferred date, time, and service location. Fast dispatch and zero upfront booking fee.
                  </p>
                </div>
              </div>

              <BookingForm preselectedServiceId={preselectedBookingServiceId} />
            </div>
          )}

          {/* PAGE 6: CONTACT US PAGE */}
          {currentPage === 'contact' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 rounded-full inline-block border border-amber-500/30">
                    Customer Support
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-white">
                    Contact Sayad Handyman
                  </h1>
                  <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                    We are available 6 days a week for hotline calls, WhatsApp messages, and site visits.
                  </p>
                </div>
              </div>

              <ContactSection />
            </div>
          )}

          {/* PAGE 7: EXPERT TIPS & DIY ADVICE PAGE */}
          {currentPage === 'tips' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 rounded-full inline-block border border-amber-500/30">
                    Technician Knowledge Base
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black text-white">
                    Expert Tips & DIY Maintenance
                  </h1>
                  <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                    Practical troubleshooting guides, preventive advice, and maintenance tips written by certified Sayad Handyman technicians.
                  </p>
                </div>
              </div>

              <ExpertTipsSection
                isStandalonePage={true}
                onBookService={handleOpenBooking}
                onSelectService={handleServiceSelect}
              />

              <BookingForm preselectedServiceId={preselectedBookingServiceId} />
            </div>
          )}

        </main>

        {/* Interactive Cost Estimator Modal */}
        <CostEstimatorModal
          isOpen={isEstimatorOpen}
          onClose={() => setIsEstimatorOpen(false)}
          onBookService={handleOpenBooking}
        />

        {/* Admin Price Control Modal */}
        <AdminPriceModal />

        {/* Floating WhatsApp Button on Every Page */}
        <FloatingWhatsApp />

        {/* Professional Footer */}
        <Footer
          onNavClick={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onServiceSelect={handleServiceSelect}
        />

      </div>
      </ServicesProvider>
    </CurrencyProvider>
  );
}
