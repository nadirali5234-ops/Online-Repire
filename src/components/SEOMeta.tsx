import React, { useEffect } from 'react';
import { PageView, Service } from '../types';
import { COMPANY_INFO } from '../data/servicesData';

interface SEOMetaProps {
  currentPage: PageView;
  selectedService: Service | null;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  currentPage,
  selectedService
}) => {
  useEffect(() => {
    let pageTitle = "Sayad Handyman | Reliable Repair & Technical Services";
    let metaDescription = "Professional handyman repair services for appliances, aircond, washing machines, refrigerators, computers, laptops, plumbing, waterproofing, and awnings.";

    if (currentPage === 'about') {
      pageTitle = "About Us | Sayad Handyman - Trusted Repair Specialists";
      metaDescription = "Learn about Sayad Handyman. 10+ years of reliable, affordable, and high quality home repair and technical maintenance services.";
    } else if (currentPage === 'services') {
      pageTitle = "Repair Services Catalog | Sayad Handyman";
      metaDescription = "Explore our 7 core repair services: Refrigerator, Washing Machine, Aircond, Computer, Awning, Plumbing, and Waterproofing.";
    } else if (currentPage === 'service-detail' && selectedService) {
      pageTitle = `${selectedService.name} | Sayad Handyman Service`;
      metaDescription = selectedService.shortDesc;
    } else if (currentPage === 'booking') {
      pageTitle = "Book a Service Appointment | Sayad Handyman";
      metaDescription = "Schedule a fast, reliable handyman visit online. Same-day service available for urgent home and business repairs.";
    } else if (currentPage === 'contact') {
      pageTitle = "Contact Sayad Handyman | Phone, WhatsApp & Address";
      metaDescription = "Get in touch with Sayad Handyman. Call +60 12-345 6789 or chat on WhatsApp for fast repair support.";
    } else if (currentPage === 'tips') {
      pageTitle = "Expert Tips & DIY Maintenance Guides | Sayad Handyman";
      metaDescription = "Practical DIY repair guides and troubleshooting advice for appliances, AC cooling, plumbing, waterproofing, laptop care, and awnings.";
    }

    document.title = pageTitle;

    // Update meta description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta');
      metaDescEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute('content', metaDescription);

  }, [currentPage, selectedService]);

  // Inject LocalBusiness JSON-LD Schema
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": COMPANY_INFO.name,
    "description": COMPANY_INFO.subheading,
    "telephone": COMPANY_INFO.phone,
    "email": COMPANY_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": COMPANY_INFO.address,
      "addressCountry": "MY"
    },
    "openingHours": "Mo-Sa 08:00-20:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "480"
    },
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
};
