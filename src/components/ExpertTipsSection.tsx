import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Wrench,
  Snowflake,
  WashingMachine,
  Wind,
  Laptop,
  Umbrella,
  Droplets,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ExpertTip, Service } from '../types';
import { EXPERT_TIPS_DATA } from '../data/expertTipsData';
import { useServices } from '../context/ServicesContext';

interface ExpertTipsSectionProps {
  onBookService?: (serviceId: string) => void;
  onSelectService?: (service: Service) => void;
  isStandalonePage?: boolean;
}

export const ExpertTipsSection: React.FC<ExpertTipsSectionProps> = ({
  onBookService,
  onSelectService,
  isStandalonePage = false
}) => {
  const { services } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<ExpertTip | null>(null);

  const categories = [
    'All',
    'Appliance Maintenance',
    'Laundry Care',
    'HVAC & Air Conditioning',
    'Computer & IT',
    'Structure & Awning',
    'Plumbing & Waterproofing'
  ];

  const filteredTips = EXPERT_TIPS_DATA.filter((tip) => {
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      tip.title.toLowerCase().includes(q) ||
      tip.summary.toLowerCase().includes(q) ||
      tip.category.toLowerCase().includes(q) ||
      tip.tags.some(t => t.toLowerCase().includes(q)) ||
      tip.sections.some(s => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
    );
    return matchesCategory && matchesSearch;
  });

  const getTipIcon = (iconName: string) => {
    switch (iconName) {
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-blue-600" />;
      case 'WashingMachine':
        return <WashingMachine className="w-5 h-5 text-indigo-600" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-cyan-600" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-purple-600" />;
      case 'Umbrella':
        return <Umbrella className="w-5 h-5 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-sky-600" />;
      default:
        return <Wrench className="w-5 h-5 text-amber-600" />;
    }
  };

  const getRelatedService = (serviceId?: string) => {
    if (!serviceId) return null;
    return services.find(s => s.id === serviceId) || null;
  };

  return (
    <section className={`py-16 ${isStandalonePage ? 'bg-slate-50' : 'bg-white border-t border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest px-3.5 py-1.5 bg-amber-100 rounded-full inline-flex items-center gap-1.5 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Expert Maintenance Advice & DIY Guides
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Handyman Knowledge Hub & Repair Advice
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Practical troubleshooting tips, preventive care routines, and step-by-step DIY advice straight from our certified repair technicians. Know when to fix and when to call a professional.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search advice, e.g. fridge, leak, AC..."
                className="w-full pl-10 pr-9 py-2.5 bg-slate-50 text-slate-900 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-amber-400 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Result Count Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 px-1">
            <span>
              Showing <strong className="text-slate-800">{filteredTips.length}</strong> of {EXPERT_TIPS_DATA.length} Expert Guides
            </span>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-amber-600 font-bold hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Tips Cards Grid */}
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip) => {
              const relService = getRelatedService(tip.relatedServiceId);
              return (
                <article
                  key={tip.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
                >
                  {/* Article Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={tip.coverImage}
                      alt={tip.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-[11px] border border-slate-700">
                        {tip.category}
                      </span>
                    </div>

                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        tip.difficulty === 'Easy DIY'
                          ? 'bg-emerald-500 text-slate-950'
                          : tip.difficulty === 'Moderate'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {tip.difficulty}
                      </span>
                    </div>

                    {/* Read time and date */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs text-slate-200 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {tip.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-300" /> {tip.publishedDate}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100 shrink-0">
                          {getTipIcon(tip.iconName)}
                        </div>
                        <span className="text-xs font-semibold text-slate-500">
                          By {tip.author}
                        </span>
                      </div>

                      <h3 
                        onClick={() => setActiveArticle(tip)}
                        className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors cursor-pointer leading-snug"
                      >
                        {tip.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2">
                        {tip.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {tip.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <button
                        onClick={() => setActiveArticle(tip)}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Read Full DIY Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                      </button>

                      {relService && onBookService && (
                        <button
                          onClick={() => onBookService(relService.id)}
                          className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Wrench className="w-3.5 h-3.5 text-amber-600" />
                          <span>Book {relService.name}</span>
                        </button>
                      )}
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Expert Guides Found</h3>
            <p className="text-xs text-slate-600">
              No DIY maintenance articles matched "{searchQuery}" in category "{selectedCategory}". Try adjusting your keywords.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors"
            >
              Clear Search & Show All Guides
            </button>
          </div>
        )}

      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="relative bg-slate-900 text-white p-6 sm:p-8 shrink-0">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {activeArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-4 mt-4 text-xs text-slate-300 border-t border-slate-800 pt-3">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" /> Author: {activeArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Published {activeArticle.publishedDate}
                </span>
              </div>
            </div>

            {/* Modal Scrollable Article Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow text-slate-800">
              
              {/* Summary Lead Box */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                <strong className="text-amber-800 block mb-1">Key Takeaway:</strong>
                {activeArticle.summary}
              </div>

              {/* Cover Image in Modal */}
              <div className="rounded-2xl overflow-hidden h-64 w-full bg-slate-100">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {activeArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{sec.heading}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {sec.content}
                    </p>

                    {sec.bullets && (
                      <ul className="space-y-1.5 pl-2 mt-2">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Pro Tip Box */}
              {activeArticle.proTip && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                      Pro Technician Tip
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-800 mt-1 leading-relaxed">
                      {activeArticle.proTip}
                    </p>
                  </div>
                </div>
              )}

              {/* When to Call Pro Warning Box */}
              <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl space-y-2 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>When Should You Call a Professional Handyman?</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  {activeArticle.whenToCallPro}
                </p>
              </div>

            </div>

            {/* Modal Bottom Call to Action Bar */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-600 text-center sm:text-left">
                Need expert assistance with this repair? Fast home dispatch available.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-200 font-bold text-xs text-slate-700 transition-colors"
                >
                  Close
                </button>

                {onBookService && (
                  <button
                    onClick={() => {
                      const relSrv = getRelatedService(activeArticle.relatedServiceId);
                      setActiveArticle(null);
                      if (relSrv) {
                        onBookService(relSrv.id);
                      } else {
                        onBookService('appliance-fridge');
                      }
                    }}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Book Technician Now</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
