import React from 'react';
import { 
  Briefcase, 
  UserCheck, 
  DollarSign, 
  Zap, 
  CheckCircle2, 
  Smile,
  ShieldAlert
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Professional Service',
      description: 'Uniformed, background-checked technicians who respect your home, clean up after every job, and maintain clear communication.',
      icon: <Briefcase className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Experienced Technicians',
      description: 'Fully certified master repair specialists with 10+ years of hands-on expertise across appliances, IT, and structural repairs.',
      icon: <UserCheck className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Affordable Pricing',
      description: 'Flat-rate transparent quotes with zero hidden surcharges or surprise diagnostic fees. You approve the price before we start.',
      icon: <DollarSign className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Fast Response',
      description: 'Rapid dispatch system with same-day emergency repair slots available for urgent leaks, fridge failures, and electrical faults.',
      icon: <Zap className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Quality Workmanship',
      description: 'Rigorous 15-point quality inspection on every repair backed by a written 90-day parts and labor guarantee.',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Customer Satisfaction',
      description: 'Your happiness is our top priority. If you are not 100% satisfied with our repair, we will re-inspect and fix it at no extra cost.',
      icon: <Smile className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full inline-block mb-3">
            Why Sayad Handyman?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            6 Reasons Homeowners & Businesses Choose Us
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            We hold ourselves to the highest technical standards in the handyman industry. Here is what sets our service apart.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Feature #{index + 1}</span>
                <span>Verified Standard ✓</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
