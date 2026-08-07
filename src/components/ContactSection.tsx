import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Navigation
} from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappClean}?text=${encodeURIComponent(
    "Hello Sayad Handyman, I would like to make an inquiry. Please assist me."
  )}`;

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      const data = await res.json();
      if (data.success) {
        setFormSubmitted(true);
      } else {
        alert(data.error || 'Failed to send message.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setFormSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest px-3.5 py-1.5 bg-amber-100 rounded-full inline-block mb-3">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact Sayad Handyman
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Have questions or need an instant quote? Call us, drop a WhatsApp message, or visit our office. We are always ready to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Details Cards as requested in prompt */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Number Placeholder */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Support</span>
                <h4 className="text-lg font-black text-slate-900">
                  <a href={`tel:${COMPANY_INFO.phoneClean}`} className="hover:text-amber-600 transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </h4>
                <p className="text-xs text-slate-500">Direct hotline for immediate service dispatch & inquiries.</p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-start gap-4 hover:border-emerald-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">WhatsApp Instant Chat</span>
                <h4 className="text-base font-bold text-slate-900">Instant Message Us</h4>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-1.5 rounded-xl transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Email Placeholder */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Inquiry</span>
                <h4 className="text-base font-bold text-slate-900">
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-amber-600 transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </h4>
                <p className="text-xs text-slate-500">Send us photos or blueprints for commercial quotes.</p>
              </div>
            </div>

            {/* Business Address Placeholder */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-start gap-4 hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Address</span>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {COMPANY_INFO.address}
                </h4>
                <p className="text-xs text-slate-500">Headquarters & Central Repair Workshop</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operating Hours</span>
                <p className="text-sm font-bold text-slate-900">{COMPANY_INFO.hours}</p>
                <p className="text-xs text-emerald-600 font-semibold">24/7 Emergency On-Call Duty</p>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Placeholder & Quick Contact Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Google Maps Placeholder as requested in prompt */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative min-h-[280px] flex flex-col justify-between p-6 text-white">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 opacity-90" />
              
              {/* Map Graphic Overlay */}
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    Service Area Coverage Map
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">
                    Sayad Handyman Service Region
                  </h3>
                </div>
                <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-bold">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              {/* Map Interactive Simulation */}
              <div className="relative z-10 my-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 backdrop-blur-md flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                  📍
                </div>
                <div className="text-xs">
                  <p className="font-bold text-white">Kuala Lumpur & Selangor Greater Metropolitan Area</p>
                  <p className="text-slate-400 mt-0.5">Dispatched within 30-45 minutes across all major townships.</p>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Google Maps Location Reference</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Quick Contact Inquiry Form */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-black text-slate-900">
                Send Us a Direct Message
              </h3>

              {formSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you for contacting Sayad Handyman. One of our support managers will reach back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-2 text-xs font-bold text-amber-700 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+60 12-345 6789"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Message *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="How can we help you today?"
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
