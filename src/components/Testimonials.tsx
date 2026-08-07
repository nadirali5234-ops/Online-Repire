import React from 'react';
import { Star, ShieldCheck, Quote, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/servicesData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest px-3.5 py-1.5 bg-amber-200/60 rounded-full inline-block mb-3">
            Real Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Trusted by 480+ Happy Homeowners
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            See why homeowners and business owners consistently rate Sayad Handyman 4.9 out of 5 stars for quality workmanship and customer satisfaction.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                {/* Service Tag */}
                <span className="inline-block text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {t.serviceName}
                </span>

                {/* Review Comment */}
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">{t.name}</h4>
                  <p className="text-[10px] text-slate-500">{t.location} • {t.date}</p>
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Banner CTA */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Have you used Sayad Handyman services?</p>
              <p className="text-xs text-slate-400">Your feedback helps us continuously elevate our workmanship standards!</p>
            </div>
          </div>
          <a
            href="#booking-section"
            className="py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition-colors"
          >
            Book Your Service Today
          </a>
        </div>

      </div>
    </section>
  );
};
