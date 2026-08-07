import React, { useState } from 'react';
import { 
  Snowflake, 
  WashingMachine, 
  Wind, 
  Laptop, 
  Umbrella, 
  Droplets, 
  ShieldCheck, 
  ArrowRight, 
  Calendar, 
  CheckCircle2,
  Clock,
  Tag,
  Search,
  X
} from 'lucide-react';
import { Service } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { useCurrency } from '../context/CurrencyContext';
import { useServices } from '../context/ServicesContext';

interface ServicesGridProps {
  onServiceSelect: (service: Service) => void;
  onBookService: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onServiceSelect,
  onBookService
}) => {
  const { services } = useServices();
  const { formatPriceRange } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All 7 Services' },
    { id: 'appliances', label: 'Appliance Repair' },
    { id: 'plumbing', label: 'Plumbing & Waterproofing' },
    { id: 'tech', label: 'Computer & IT Repair' },
    { id: 'structure', label: 'Awning & Structural' }
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesKeyword = !q || (
      service.name.toLowerCase().includes(q) ||
      service.shortDesc.toLowerCase().includes(q) ||
      service.fullDesc.toLowerCase().includes(q) ||
      service.category.toLowerCase().includes(q) ||
      service.commonProblems.some(p => 
        p.issue.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.symptom.toLowerCase().includes(q)
      ) ||
      service.ourSolution.some(sol => sol.toLowerCase().includes(q)) ||
      service.benefits.some(b => b.toLowerCase().includes(q))
    );
    return matchesCategory && matchesKeyword;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Snowflake':
        return <Snowflake className="w-6 h-6 text-blue-600" />;
      case 'WashingMachine':
        return <WashingMachine className="w-6 h-6 text-indigo-600" />;
      case 'Wind':
        return <Wind className="w-6 h-6 text-cyan-600" />;
      case 'Laptop':
        return <Laptop className="w-6 h-6 text-purple-600" />;
      case 'Umbrella':
        return <Umbrella className="w-6 h-6 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      default:
        return <Droplets className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="services-section" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest px-3.5 py-1.5 bg-amber-100 rounded-full inline-block mb-3">
            Our Professional Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Complete Home & Technical Repair Solutions
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From major home appliances and air conditioning to computer IT repairs, custom awnings, plumbing, and waterproofing — our certified technicians deliver guaranteed quality workmanship.
          </p>

          {/* Search Bar Input */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repair services by keyword (e.g., washing machine, leak, cooling, awning, laptop)..."
                className="w-full pl-12 pr-10 py-3.5 bg-white text-slate-900 text-sm rounded-2xl border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all placeholder:text-slate-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick suggested keyword chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Popular Keywords:</span>
              {['Fridge', 'Washer', 'AC', 'Laptop', 'Leak', 'Awning'].map((kw) => (
                <button
                  key={kw}
                  onClick={() => setSearchQuery(kw)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    searchQuery.toLowerCase() === kw.toLowerCase()
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-600'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count text */}
          <div className="mt-4 text-xs font-semibold text-slate-500">
            Showing <span className="text-slate-900 font-extrabold">{filteredServices.length}</span> of {SERVICES_DATA.length} repair services
            {searchQuery && (
              <span> matching "<span className="text-amber-600">{searchQuery}</span>"</span>
            )}
          </div>
        </div>

        {/* Service Cards Grid or Empty State */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-[11px] tracking-wide border border-slate-700">
                    {service.category.toUpperCase()}
                  </span>
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1 text-xs font-semibold text-white">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Est. Time: {service.duration}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 shrink-0">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mt-3">
                    {service.shortDesc}
                  </p>

                  {/* Highlighted Common Issues fixed */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Common Fixes:
                    </p>
                    {service.commonProblems.slice(0, 2).map((prob, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{prob.issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Pricing & Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Tag className="w-3.5 h-3.5 text-amber-500" /> Standard Rate:
                    </span>
                    <span className="text-amber-600 text-sm font-extrabold">{formatPriceRange(service.usdMin, service.usdMax)}</span>
                  </div>

                  {/* "Learn More" & "Book Service" buttons as requested in prompt */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onServiceSelect(service)}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onBookService(service.id)}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Service</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Services Found</h3>
            <p className="text-xs text-slate-600">
              We couldn't find any service matching "{searchQuery}". Try searching for terms like "fridge", "cooling", "leak", "laptop", "AC", or "awning".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
            >
              Reset Search & Show All 7 Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
