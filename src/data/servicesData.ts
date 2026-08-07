import { Service, Testimonial } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'refrigerator-repair',
    slug: 'refrigerator-repair',
    name: 'Refrigerator Repair',
    category: 'appliances',
    shortDesc: 'Fast diagnostic and repair for all fridge brands, compressors, gas leaks, and cooling issues.',
    fullDesc: 'A malfunctioning refrigerator can disrupt your daily routine and cause food spoilage. Sayad Handyman provides expert, same-day refrigerator repair services for all major brands and models, including inverter, double-door, side-by-side, and commercial units. Our certified technicians quickly identify the root cause and restore optimal cooling performance.',
    iconName: 'Snowflake',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    estimatedPrice: '$50 - $180',
    usdMin: 50,
    usdMax: 180,
    duration: '1 - 2 Hours',
    commonProblems: [
      {
        issue: 'Refrigerator Not Cooling Properly',
        symptom: 'Food spoiling quickly or freezer section failing to freeze ice.',
        description: 'Often caused by dirty condenser coils, faulty thermostat, or refrigerant (gas) leakage.'
      },
      {
        issue: 'Loud Hum or Excessive Noise',
        symptom: 'Rattling or buzzing sound coming from the back or inside.',
        description: 'Indicates worn compressor motor mounts, failing fan blades, or defective defrost timer.'
      },
      {
        issue: 'Water Leaking on Floor',
        symptom: 'Puddles of water accumulating around the base or bottom drawers.',
        description: 'Usually caused by a blocked defrost drain tube or cracked water inlet valve.'
      },
      {
        issue: 'Freezer Frost Build-up',
        symptom: 'Heavy ice accumulation on freezer walls and shelves.',
        description: 'Caused by damaged door seal gaskets or a failed automatic defrost heater sensor.'
      }
    ],
    ourSolution: [
      'Comprehensive digital temperature and electrical diagnostic testing',
      'Compressor testing, relay replacement, and gas top-up / re-gassing',
      'Defrost timer, thermostat, and sensor replacement',
      'Door gasket seal replacement and drain line clearing'
    ],
    benefits: [
      'Same-day emergency response to prevent food spoilage',
      'Genuine spare parts with 90-day warranty',
      'Transparent pricing with zero hidden fees',
      'Servicing for all top brands: Samsung, LG, Panasonic, Toshiba, Sharp, Whirlpool'
    ],
    whyChooseUs: [
      'Over 10 years of specialized refrigeration experience',
      'Equipped with mobile diagnostic tools for on-the-spot repair',
      'Clean work ethics — we leave your kitchen spotlessly clean'
    ],
    faqs: [
      {
        question: 'How quickly can a technician come inspect my fridge?',
        answer: 'We offer same-day appointments across town. Emergency calls are usually dispatched within 2 hours.'
      },
      {
        question: 'Do you provide warranty on replaced fridge parts?',
        answer: 'Yes! All replaced parts come with a 90-day parts and labor guarantee.'
      },
      {
        question: 'Is it worth repairing an older refrigerator?',
        answer: 'Our technician will provide a honest diagnostic. If the repair cost exceeds 50% of a new fridge value, we will give you objective advice.'
      }
    ]
  },
  {
    id: 'washing-machine-repair',
    slug: 'washing-machine-repair',
    name: 'Washing Machine Repair',
    category: 'appliances',
    shortDesc: 'Expert repair for top-load, front-load, and dryer units failing to spin, drain, or power on.',
    fullDesc: 'Keep your laundry routine effortless with Sayad Handyman washing machine repair services. We fix top-load, front-load, semi-automatic, and combined washer-dryer machines. Whether your washer won’t drain, makes loud grinding sounds during spin cycle, or displays error codes, our experienced technicians solve it efficiently.',
    iconName: 'WashingMachine',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    estimatedPrice: '$45 - $160',
    usdMin: 45,
    usdMax: 160,
    duration: '1 - 2 Hours',
    commonProblems: [
      {
        issue: 'Washer Won’t Spin or Drain',
        symptom: 'Clothes remain soaking wet after cycle completes or water remains in drum.',
        description: 'Caused by clogged drain pump filter, worn drive belt, or faulty lid switch sensor.'
      },
      {
        issue: 'Extreme Vibration & Violent Shaking',
        symptom: 'Machine moves across floor during high speed spin cycle.',
        description: 'Indicates worn shock absorbers, broken suspension springs, or unbalanced drum bearings.'
      },
      {
        issue: 'Water Leakage During Wash Cycle',
        symptom: 'Water leaking underneath the unit or front door seal.',
        description: 'Caused by torn door rubber gasket, loose internal hoses, or cracked water tub.'
      },
      {
        issue: 'Error Codes & Power Failure',
        symptom: 'Control board blinks error codes or machine trips electrical breaker.',
        description: 'Points to main PCB control board fault, wiring short, or door lock solenoid failure.'
      }
    ],
    ourSolution: [
      'Drain pump unclogging, repair, or full motor replacement',
      'Drum bearing and suspension rod alignment/replacement',
      'Door boot rubber gasket fitting and leak sealing',
      'Main circuit board (PCB) repair and component testing'
    ],
    benefits: [
      'Fixes on-site without transporting your heavy machine away',
      'Noise and vibration dampening calibration',
      'Clear upfront quote before work begins',
      'Compatible with Toshiba, Electrolux, Panasonic, Bosch, LG, Samsung, Hitachi'
    ],
    whyChooseUs: [
      'Specialized tools for drum bearing removal and shaft alignment',
      'Prompt arrival and courteous service',
      'Complete post-repair washing and spinning safety test'
    ],
    faqs: [
      {
        question: 'Do I need to move the washing machine out of the house?',
        answer: 'No, 95% of repairs are performed directly inside your home laundry room.'
      },
      {
        question: 'Why does my washer smell bad inside?',
        answer: 'Mold and detergent residue build up behind the tub. We offer deep drum cleaning services alongside repairs.'
      }
    ]
  },
  {
    id: 'aircond-service',
    slug: 'aircond-service',
    name: 'Aircond Service & Repair',
    category: 'appliances',
    shortDesc: 'Chemical cleaning, gas top-up, compressor troubleshooting, and leak repairs for wall & cassette units.',
    fullDesc: 'Stay cool and comfortable all year round with Sayad Handyman air conditioner servicing. We specialize in regular general servicing, deep chemical overhaul washing, refrigerant gas top-ups (R22, R410A, R32), water leak repairs, and inverter compressor troubleshooting for split, cassette, and centralized units.',
    iconName: 'Wind',
    image: '/src/assets/images/sayad_service_aircond_1786128081836.jpg',
    estimatedPrice: '$35 - $150',
    usdMin: 35,
    usdMax: 150,
    duration: '1 Hour per unit',
    commonProblems: [
      {
        issue: 'Air Conditioner Blowing Warm Air',
        symptom: 'Unit turns on but room remains hot despite low temperature setting.',
        description: 'Caused by low refrigerant gas levels, dirty evaporator coils, or compressor capacitor failure.'
      },
      {
        issue: 'Water Dripping / Leaking Indoors',
        symptom: 'Water droplets falling from blower onto wall or furniture.',
        description: 'Result of clogged condensate drain pipe, jelly slime accumulation, or tilted indoor unit.'
      },
      {
        issue: 'Foul Odor or Dust Allergy Trigger',
        symptom: 'Musty smell or excessive dust blowing when AC is powered on.',
        description: 'Indicates bacterial growth and thick dust clogging the filter and cooling fins.'
      },
      {
        issue: 'Noisy Indoor / Outdoor Fan Motor',
        symptom: 'Screeching or heavy vibration noise during operation.',
        description: 'Caused by unlubricated fan motor bearings or damaged fan blades.'
      }
    ],
    ourSolution: [
      'Anti-bacterial chemical washing of evaporator fins, blower wheel, and drain pan',
      'High-pressure water jet washing of outdoor condenser unit',
      'Gas pressure check and precision R32 / R410A gas refill',
      'Drain pipe vacuum clearing and indoor unit levelling'
    ],
    benefits: [
      'Reduces electricity bills up to 30% by improving cooling efficiency',
      'Eliminates air-borne bacteria and dust allergens',
      'Extends the lifespan of expensive inverter compressors',
      '30-day no-leak guarantee post service'
    ],
    whyChooseUs: [
      'Proper floor and furniture protective covers used during chemical wash',
      'Accurate pressure gauge measurement with digital gas meters',
      'Packages available for multi-unit home and office maintenance'
    ],
    faqs: [
      {
        question: 'How often should I service my aircond?',
        answer: 'For homes, general cleaning is recommended every 3 to 6 months. For high-usage offices, chemical wash every 6 months.'
      },
      {
        question: 'Does chemical overhaul fix water leaks?',
        answer: 'Yes! Chemical overhaul flushes out all jelly blockages inside the internal drain tray and pipe completely.'
      }
    ]
  },
  {
    id: 'computer-laptop-repair',
    slug: 'computer-laptop-repair',
    name: 'Computer, Desktop & Laptop Repair',
    category: 'tech',
    shortDesc: 'Hardware upgrades, screen replacement, virus cleanup, power issue fixes, and custom PC builds.',
    fullDesc: 'Fast, reliable technical IT support for home and business computers. Sayad Handyman repairs laptops, desktop towers, and all-in-one PCs. From slow performance and blue screens to broken laptop screens, liquid damage, battery replacement, and SSD speed upgrades, we get your technology working seamlessly.',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    estimatedPrice: '$40 - $200',
    usdMin: 40,
    usdMax: 200,
    duration: '1 - 24 Hours',
    commonProblems: [
      {
        issue: 'Slow Performance & Freezing',
        symptom: 'Computer takes minutes to boot or crashes during work.',
        description: 'Caused by outdated mechanical hard drives (HDD), thermal throttling, or background malware.'
      },
      {
        issue: 'No Power or Charging Failure',
        symptom: 'Laptop won’t turn on or charging pin loose/broken.',
        description: 'Indicates faulty motherboard power IC, dead battery, or damaged DC charging jack.'
      },
      {
        issue: 'Cracked Screen or Lines on Display',
        symptom: 'Flickering display, vertical color bars, or physical glass crack.',
        description: 'Requires screen panel replacement or flex cable reconnection.'
      },
      {
        issue: 'Overheating & Loud Fan Noise',
        symptom: 'Bottom of laptop gets burning hot and shuts down suddenly.',
        description: 'Dried thermal paste on CPU/GPU and dust blockage inside cooling fan vents.'
      }
    ],
    ourSolution: [
      'High-speed NVMe/SATA SSD upgrade with full OS migration and data preservation',
      'Full thermal repasting (Arctic MX-4) and internal dust removal',
      'Laptop LED screen, keyboard, and battery replacements',
      'Malware/virus removal and motherboard micro-soldering'
    ],
    benefits: [
      'Data safety guaranteed — no data loss during hardware upgrades',
      'Instant speed boost up to 10x with SSD clone service',
      'On-site pick-up and drop-off option available',
      'Support for Windows, macOS, and custom gaming PCs'
    ],
    whyChooseUs: [
      'Experienced IT technicians with anti-static workstation tools',
      'Genuine replacement parts sourced directly from authorized suppliers',
      'Clear upfront diagnosis before any component replacement'
    ],
    faqs: [
      {
        question: 'Will my files and photos be safe during repair?',
        answer: 'Absolutely. We prioritize data integrity and back up critical files before performing system maintenance.'
      },
      {
        question: 'Can you upgrade my old slow laptop instead of buying a new one?',
        answer: 'Yes! Upgrading to an SSD drive and adding RAM gives older laptops new life at a fraction of a new PC cost.'
      }
    ]
  },
  {
    id: 'awning-installation',
    slug: 'awning-installation',
    name: 'Awning Installation & Repair',
    category: 'structure',
    shortDesc: 'Custom polycarbonate, glass, aluminum, and canvas awnings for car porches, balconies, and shops.',
    fullDesc: 'Protect your outdoor spaces, car porch, windows, and storefronts from harsh sun and heavy rain with custom awning installation by Sayad Handyman. We design, fabricate, and install heavy-duty polycarbonate, tempered glass, aluminum composite panel (ACP), and retractable canvas awnings tailored to your property.',
    iconName: 'Umbrella',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    estimatedPrice: '$200 - $1,200',
    usdMin: 200,
    usdMax: 1200,
    duration: '1 - 3 Days',
    commonProblems: [
      {
        issue: 'Rain Water Dripping Between Wall and Awning',
        symptom: 'Leaks at wall joint connection line during downpours.',
        description: 'Worn sealant silicone bond or improper flashing installation.'
      },
      {
        issue: 'Faded, Cracked, or Damaged Polycarbonate Sheets',
        symptom: 'Brittle translucent panels breaking under hail or storm debris.',
        description: 'Sun UV degradation over years of exposure.'
      },
      {
        issue: 'Rusting Metal Support Beams',
        symptom: 'Peeling paint, reddish rust spots, or structural weakness.',
        description: 'Lack of anti-rust primer coat on iron steel frames.'
      }
    ],
    ourSolution: [
      'Custom measurement, structural steel welding, and rust-proof powder coating',
      'UV-protected polycarbonate sheet and ACP panel replacement',
      'Heavy-duty industrial silicone re-sealing along wall joints',
      'Gutter installation and rainwater downspout alignment'
    ],
    benefits: [
      'High UV protection keeping car porch and patio significantly cooler',
      'Durable weather-resistant steel structure engineered for wind safety',
      'Aesthetic modern designs that enhance property resale value',
      '5-Year structural craftsmanship guarantee'
    ],
    whyChooseUs: [
      'Precision site measurement with laser levelling tools',
      'Fully compliant with residential building guidelines',
      'Clean fabrication process with complete post-job debris cleanup'
    ],
    faqs: [
      {
        question: 'What is the most durable awning material for a car porch?',
        answer: 'ACP (Aluminum Composite Panel) and Tempered Glass offer maximum durability and modern appearance with minimal rain noise.'
      },
      {
        question: 'Do you repair existing damaged awnings?',
        answer: 'Yes! We replace broken sheets, re-weld rusty joints, and apply waterproof sealant coatings.'
      }
    ]
  },
  {
    id: 'plumbing-services',
    slug: 'plumbing-services',
    name: 'Plumbing Services',
    category: 'plumbing',
    shortDesc: 'Unclogging pipes, repairing water leaks, toilet bowl installation, water heaters, and pipe replacements.',
    fullDesc: 'Fast, efficient plumbing solutions for residential and commercial properties. Sayad Handyman handles everything from emergency pipe burst leaks and clogged drains/toilets to installing new sinks, faucets, water heaters, water filters, and full PPR/PVC re-piping.',
    iconName: 'Droplets',
    image: '/src/assets/images/sayad_service_plumbing_1786128096826.jpg',
    estimatedPrice: '$40 - $220',
    usdMin: 40,
    usdMax: 220,
    duration: '1 - 3 Hours',
    commonProblems: [
      {
        issue: 'Clogged Toilet, Sink, or Floor Drain',
        symptom: 'Water draining very slowly or backing up with foul odor.',
        description: 'Accumulation of grease, hair, debris, or foreign objects in drain traps.'
      },
      {
        issue: 'Leaking Faucet, Flexi-Hose, or Valve',
        symptom: 'Continuous dripping noise wasting water and increasing utility bills.',
        description: 'Worn internal rubber washers, ceramic disc cartridges, or corroded fittings.'
      },
      {
        issue: 'Hidden Water Leak inside Wall/Slab',
        symptom: 'Unexplained high water bill, damp wall paint, or dark water spots.',
        description: 'Concealed burst copper or galvanized iron pipes under pressure.'
      },
      {
        issue: 'Low Water Pressure or Water Heater Malfunction',
        symptom: 'Trickling shower or instant water heater failing to warm water.',
        description: 'Sediment buildup in water heater filter or failing heating element switch.'
      }
    ],
    ourSolution: [
      'High-pressure electric rigid drain snake machine unclogging',
      'Acoustic water leak detection to pinpoint hidden pipe breaks without damaging tiles',
      'Installation of stainless steel faucets, flush valves, and instant shower heaters',
      'Full kitchen and bathroom PPR/PVC re-piping with pressure testing'
    ],
    benefits: [
      '24/7 Rapid response for emergency pipe bursts',
      'Clean plumber guarantee — no mess left behind',
      'High grade brass and stainless steel corrosion-resistant fittings used',
      'Transparent flat-rate pricing based on work scope'
    ],
    whyChooseUs: [
      'Licensed plumbers equipped with heavy-duty drain snakes and pressure pumps',
      'Over 1,000+ satisfied residential and commercial plumbing jobs completed',
      'Complete water line pressure check after every repair'
    ],
    faqs: [
      {
        question: 'How do you clear tough drain clogs without breaking pipes?',
        answer: 'We use professional motorized drain augers and eco-friendly high-pressure jetting that clears blockages safely.'
      },
      {
        question: 'Can you help replace my old toilet bowl unit?',
        answer: 'Yes! We supply and install modern water-saving toilet bowl sets including floor seal alignment.'
      }
    ]
  },
  {
    id: 'waterproofing-services',
    slug: 'waterproofing-services',
    name: 'Waterproofing Services',
    category: 'plumbing',
    shortDesc: 'Stop roof leaks, bathroom floor slab dampness, balcony water seepage, and basement dampness guaranteed.',
    fullDesc: 'Protect your property structure from water damage, mold, and ceiling leaks with Sayad Handyman advanced waterproofing solutions. We specialize in non-destructive polyurethane (PU) injection grout waterproofing, liquid membrane torch-on membrane application, bathroom tile joint chemical sealing, and roof tile leak repairs.',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    estimatedPrice: '$150 - $950',
    usdMin: 150,
    usdMax: 950,
    duration: '1 - 2 Days',
    commonProblems: [
      {
        issue: 'Ceiling Water Stains & Paint Peeling Below Bathroom',
        symptom: 'Yellow damp patches or dripping water on ground floor ceiling.',
        description: 'Failed waterproofing membrane layer beneath top bathroom floor tiles.'
      },
      {
        issue: 'Roof Tile Seepage During Rainstorm',
        symptom: 'Water dripping through plaster ceiling during storms.',
        description: 'Cracked ridge tiles, damaged flashing, or blocked roof gutters.'
      },
      {
        issue: 'Balcony & External Wall Dampness',
        symptom: 'Efflorescence white powder, moss growth, or wall moisture.',
        description: 'Hairline wall cracks allowing rainwater absorption.'
      }
    ],
    ourSolution: [
      'High-pressure Polyurethane (PU) chemical grout injection to seal internal concrete voids',
      'Nanotechnology hydrophobic transparent chemical tile sealer application (no hacking needed)',
      'Multi-layer elastomeric torch-on acrylic membrane coating on roof concrete slabs',
      'Ceiling restoration, anti-mold primer, and water-repellent paint coat'
    ],
    benefits: [
      'No-hacking PU injection technology saves time and preserves existing tiles',
      'Long-lasting leak protection backed by up to 5-year written warranty',
      'Prevents structural concrete cancer and steel reinforcement corrosion',
      'Completely halts ceiling mold spores for healthier indoor air quality'
    ],
    whyChooseUs: [
      'Infrared thermal camera inspection to locate invisible moisture intrusion points',
      'Industrial grade elastomeric waterproofing materials engineered for humid weather',
      'Detailed site report with before-and-after thermal moisture testing'
    ],
    faqs: [
      {
        question: 'Do you need to hack up my bathroom floor tiles to fix ceiling leaks?',
        answer: 'Not necessarily! With our PU injection grout technique, we seal concrete leaks from below or through tile joints without breaking tiles.'
      },
      {
        question: 'How long does the waterproofing warranty last?',
        answer: 'We provide a 1 to 5 Year written warranty depending on the chosen waterproofing system.'
      }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Ahmad Razak',
    location: 'Kuala Lumpur',
    serviceName: 'Refrigerator Repair',
    rating: 5,
    comment: 'My double-door Samsung fridge stopped cooling on a Saturday morning. Sayad Handyman technician arrived within 2 hours, diagnosed a blown starter relay, and fixed it on the spot. Saved hundreds in groceries!',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 't2',
    name: 'Jennifer Tan',
    location: 'Petaling Jaya',
    serviceName: 'Aircond Service',
    rating: 5,
    comment: 'Punctual, super clean, and polite. They chemical washed all 4 aircond units in my house and laid down protective floor covers. The air is so icy cold now. Highly recommended!',
    date: '1 month ago',
    verified: true
  },
  {
    id: 't3',
    name: 'Suresh Kumar',
    location: 'Subang Jaya',
    serviceName: 'Waterproofing Services',
    rating: 5,
    comment: 'Had a persistent leak dripping onto my living room ceiling from upstairs master bath. They used PU injection without destroying any tiles. Problem completely solved!',
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 't4',
    name: 'David Lim',
    location: 'Shah Alam',
    serviceName: 'Plumbing Services',
    rating: 5,
    comment: 'Our main drain was blocked badly. Sayad Handyman came with an electric snake machine and unblocked it in 45 minutes flat. Honest pricing and zero hidden fees.',
    date: 'Just recently',
    verified: true
  }
];

export const COMPANY_INFO = {
  name: 'Sayad Handyman',
  tagline: 'Reliable Handyman & Repair Services You Can Trust',
  subheading: 'Professional repair, installation, plumbing and waterproofing services for your home and business.',
  phone: '+92 303 0352137',
  phoneClean: '+923030352137',
  whatsapp: '03030352137',
  whatsappClean: '923030352137',
  email: 'info@sayadhandyman.com',
  address: 'Sayad Handyman Services, Main Boulevard, City Center',
  hours: '24/7 Availability | Emergency Service Available',
  rating: 4.9,
  reviewsCount: 480,
  yearsExperience: 10,
  completedJobs: '2,500+',
  socialLinks: {
    facebook: 'https://facebook.com/sayadhandyman',
    instagram: 'https://instagram.com/sayadhandyman',
    youtube: 'https://youtube.com/@sayadhandyman',
    tiktok: 'https://tiktok.com/@sayadhandyman',
    linkedin: 'https://linkedin.com/company/sayadhandyman',
    whatsapp: 'https://wa.me/923030352137?text=Hello%20Sayad%20Handyman%20Service'
  }
};
