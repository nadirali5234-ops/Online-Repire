import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  CheckCircle, 
  Wrench,
  ThumbsUp,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column with Stats Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="/src/assets/images/sayad_hero_handyman_1786128061674.jpg"
                alt="Sayad Handyman Team at Work"
                referrerPolicy="no-referrer"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0">
                    10+
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Years of Trusted Industry Experience</p>
                    <p className="text-xs text-slate-500">Over 2,500+ residential & commercial repairs completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-slate-700">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-400">100% Quality Guaranteed</p>
                <p className="text-[11px] text-slate-300">Certified Vetted Technicians</p>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest px-3.5 py-1.5 bg-amber-100 rounded-full inline-block">
                About Sayad Handyman
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Your Trusted Partner for Home & Technical Repair Services
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              At <strong className="text-slate-900">Sayad Handyman</strong>, we provide reliable, professional, and affordable repair and maintenance services with a relentless focus on quality workmanship and complete customer satisfaction. 
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you are dealing with a leaking refrigerator, an emergency pipe burst, air conditioner malfunction, computer IT failure, or waterproofing leaks — our skilled technicians treat your home with the care and precision it deserves.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Honest & Transparent</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Flat-rate upfront pricing with zero hidden charges or surprise diagnostic fees.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Fast Response Time</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Same-day dispatch for urgent appliance and plumbing emergencies.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <Award className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Guaranteed Parts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We use genuine, high-grade replacement parts backed by written warranty.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <ThumbsUp className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Customer First Focus</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Over 480+ five-star verified reviews from satisfied local homeowners.</p>
                </div>
              </div>
            </div>

            {/* Quote Banner */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-900 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Our Promise</p>
                <p className="text-sm font-extrabold text-slate-900 mt-0.5">"We don't just fix problems — we build long-term trust."</p>
              </div>
              <Wrench className="w-8 h-8 text-amber-600 shrink-0 opacity-80" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
