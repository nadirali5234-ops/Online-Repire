import { ExpertTip } from '../types';

export const EXPERT_TIPS_DATA: ExpertTip[] = [
  {
    id: 'tip-fridge-maintenance',
    slug: 'refrigerator-maintenance-tips',
    title: '5 Essential Refrigerator Maintenance Tips to Prevent Costly Repairs',
    category: 'Appliance Maintenance',
    relatedServiceId: 'appliance-fridge',
    readTime: '4 min read',
    publishedDate: 'Aug 2, 2026',
    author: 'Master Tech Sayad',
    coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    iconName: 'Snowflake',
    difficulty: 'Easy DIY',
    summary: 'Keep your food fresh and prevent sudden cooling failures with these 5 simple maintenance habits that extend refrigerator life by years.',
    tags: ['Refrigerator', 'Appliance Care', 'DIY Maintenance', 'Energy Saving'],
    sections: [
      {
        heading: '1. Clean the Condenser Coils Twice a Year',
        content: 'Dust, pet hair, and lint accumulate on condenser coils located under or behind the fridge. When coils are dirty, the compressor must run twice as hard to disperse heat, leading to premature burnout and higher electric bills.',
        bullets: [
          'Unplug the refrigerator before cleaning.',
          'Use a coil brush or narrow vacuum attachment to gently remove dust.',
          'Re-plug and check airflow.'
        ]
      },
      {
        heading: '2. Perform the "Dollar Bill Test" on Door Seals',
        content: 'Worn or cracked rubber gaskets allow warm ambient air to leak into your fridge, causing frost buildup and continuous compressor operation.',
        bullets: [
          'Trap a dollar bill half-in and half-out of the closed fridge door.',
          'Pull gently: if it slides out with zero resistance, your gasket seal is failing.',
          'Clean gaskets with warm soapy water to restore elasticity.'
        ]
      },
      {
        heading: '3. Set Correct Internal Temperatures',
        content: 'Setting your fridge too cold causes ice formation on evaporator coils, blocking airflow.',
        bullets: [
          'Fresh Food Compartment: Ideal at 37°F - 40°F (3°C - 4°C).',
          'Freezer Compartment: Ideal at 0°F (-18°C).'
        ]
      },
      {
        heading: '4. Clear the Condensate Drain Hole',
        content: 'If water pools underneath your crisper drawers, the defrost drain tube is likely clogged with food particles or ice. Flush it with warm water mixed with mild baking soda.'
      }
    ],
    proTip: 'Never overload vents inside the fridge! Ensure at least 2 inches of space around air vents so cold air circulates evenly.',
    whenToCallPro: 'If the compressor clicks repeatedly without starting, if ice rapidly accumulates on the rear freezer wall, or if the fridge is warm while the freezer is icy, contact Sayad Handyman for expert diagnostic and gas refilling.'
  },
  {
    id: 'tip-washer-drain-fix',
    slug: 'washing-machine-wont-drain-guide',
    title: 'How to Fix a Washing Machine That Won\'t Drain or Spin',
    category: 'Laundry Care',
    relatedServiceId: 'appliance-washer',
    readTime: '5 min read',
    publishedDate: 'Jul 28, 2026',
    author: 'Tech Lead Rashid',
    coverImage: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    iconName: 'WashingMachine',
    difficulty: 'Easy DIY',
    summary: 'Standing water in your washing machine drum? Learn how to safely drain the drum and clear common drain filter clogs yourself in 15 minutes.',
    tags: ['Washing Machine', 'DIY Troubleshooting', 'Drain Pump', 'Plumbing'],
    sections: [
      {
        heading: '1. Check and Clean the Coin Trap Drain Filter',
        content: 'Front-load and many top-load washers feature an accessible filter located at the bottom front panel. Coins, lint, socks, and hair frequently block this filter, stopping the drain pump.',
        bullets: [
          'Place a towel and shallow pan below the filter hatch.',
          'Unscrew the filter knob counter-clockwise slowly to release trapped water.',
          'Remove trapped debris, rinse under hot tap water, and screw back tightly.'
        ]
      },
      {
        heading: '2. Inspect the External Drain Hose for Kinks',
        content: 'Ensure the flexible accordion hose behind the machine is not squished against the wall or bent at an acute angle blocking water flow.'
      },
      {
        heading: '3. Balance Heavy Laundry Loads',
        content: 'Modern washing machines refuse to high-spin if the load is unbalanced (e.g. one heavy wet rug). Redistribute heavy blankets manually and retry the spin cycle.'
      }
    ],
    proTip: 'Run a tub-clean cycle once a month with 1 cup of white vinegar or washer cleaning tablets to remove soap scum buildup that erodes internal pump seals.',
    whenToCallPro: 'If clearing the filter does not solve standing water, or if you hear a grinding/humming noise when draining, your drain pump motor or drive belt may need immediate replacement.'
  },
  {
    id: 'tip-ac-filter-cleaning',
    slug: 'air-conditioner-efficiency-guide',
    title: 'Boost Air Conditioner Cooling & Reduce Electricity Bills by 30%',
    category: 'HVAC & Air Conditioning',
    relatedServiceId: 'aircond-service',
    readTime: '6 min read',
    publishedDate: 'Aug 5, 2026',
    author: 'Cooling Specialist Amir',
    coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wind',
    difficulty: 'Easy DIY',
    summary: 'Is your AC blowing warm air or dropping water inside your room? Simple filter maintenance and early leak detection can save hundreds on energy.',
    tags: ['Air Conditioner', 'AC Cleaning', 'Energy Efficiency', 'Cooling'],
    sections: [
      {
        heading: '1. Wash Mesh Filters Every 2-3 Weeks',
        content: 'Dust-clogged filters starve the blower fan of air, forcing the compressor to work at max load and freezing the evaporator aluminum fins.',
        bullets: [
          'Pop open the front AC unit cover and slide out the mesh filters.',
          'Rinse under gentle running water from the clean side outwards.',
          'Let filters dry completely in shade before reinstalling.'
        ]
      },
      {
        heading: '2. Prevent Water Leaking Inside Your Room',
        content: 'Indoor AC dripping occurs when algae and dust clog the narrow PVC drain tray pipe. You can use a wet/dry shop vac on the outdoor drain hose outlet to suction out jelly-like clogs.'
      },
      {
        heading: '3. Optimal Temperature Settings',
        content: 'Setting your AC to 24°C - 25°C with moderate fan speed provides maximum human comfort while using up to 30% less power than blasting at 16°C.'
      }
    ],
    proTip: 'If your AC unit produces a musty smell when powered on, steam chemical cleaning and blower wheel dismantling is required to eliminate mold spore colonies.',
    whenToCallPro: 'If you notice ice formation on copper pipes, water leaking constantly from the indoor blower, or warm air blowing despite clean filters, call Sayad Handyman for chemical wash and gas refilling.'
  },
  {
    id: 'tip-laptop-overheating-fix',
    slug: 'laptop-computer-overheating-care',
    title: 'How to Stop Your Laptop Overheating & Slowing Down',
    category: 'Computer & IT',
    relatedServiceId: 'computer-repair',
    readTime: '5 min read',
    publishedDate: 'Jul 20, 2026',
    author: 'IT Engineer Farhan',
    coverImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    iconName: 'Laptop',
    difficulty: 'Moderate',
    summary: 'Laptops throttle speed and shutdown when internal heat exceeds safe limits. Here is how to maintain optimal thermal performance at home.',
    tags: ['Laptop Repair', 'Computer Maintenance', 'Thermal Paste', 'IT Tips'],
    sections: [
      {
        heading: '1. Keep Vents Clear & Avoid Soft Surfaces',
        content: 'Using a laptop on blankets, pillows, or beds smothers intake vents at the bottom, trapping heat inside fragile processor chips.',
        bullets: [
          'Always use a flat, hard desk or elevated cooling pad.',
          'Use compressed canned air to blow dust out of exhaust grills.'
        ]
      },
      {
        heading: '2. Thermal Paste Degradation (Every 2 Years)',
        content: 'Factory thermal paste between CPU chip and copper heatsink hardens over time into dry crust, losing heat conductivity. Replacing it drops temperatures by 15°C - 25°C.'
      },
      {
        heading: '3. Upgrade to Solid State Drive (SSD)',
        content: 'If your computer takes 5+ minutes to boot up, replacing an old spinning Hard Disk Drive (HDD) with an SSD increases speed by up to 10x while generating less heat.'
      }
    ],
    proTip: 'Monitor CPU temperatures using free tools like HWMonitor. Idle temps should stay between 40°C - 55°C.',
    whenToCallPro: 'If your laptop battery bulges, fans make loud rattling noises, or blue screen errors occur frequently, bring it to Sayad Handyman for hardware diagnostics, fan replacement, and SSD cloning.'
  },
  {
    id: 'tip-awning-maintenance',
    slug: 'protect-canvas-awning-rain-sun',
    title: 'How to Clean & Maintain Canvas Awnings Against Mold & Sun Damage',
    category: 'Structure & Awning',
    relatedServiceId: 'canvas-awning',
    readTime: '4 min read',
    publishedDate: 'Jul 15, 2026',
    author: 'Structural Specialist Tariq',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    iconName: 'Umbrella',
    difficulty: 'Easy DIY',
    summary: 'Extend the vibrant color and water-repellent coating of outdoor canvas awnings with routine washing and tension adjustments.',
    tags: ['Canvas Awning', 'Outdoor Care', 'Waterproofing', 'Home Exterior'],
    sections: [
      {
        heading: '1. Gentle Washing Routine',
        content: 'Never use harsh bleach or high-pressure power washers on acrylic canvas awnings as it strips protective fluorocarbon water barrier coatings.',
        bullets: [
          'Hose down canvas with clean water to loosen dirt.',
          'Use a soft bristle brush with mild dish soap and lukewarm water.',
          'Air dry completely before retracting motorized or manual arms.'
        ]
      },
      {
        heading: '2. Re-Applying Fabric Water Repellent',
        content: 'Every 2 years, apply a fabric waterproofing spray (like 303 Fabric Guard) after cleaning to ensure rain beads off effortlessly.'
      },
      {
        heading: '3. Retract During Storm Winds',
        content: 'Retractable awnings are designed for rain and sun protection, not gale-force wind gusts exceeding 35 km/h.'
      }
    ],
    proTip: 'Lubricate awning folding arm joints with silicone spray once a year to prevent rust squeaks and mechanical jam.',
    whenToCallPro: 'For fabric re-stitching, motorized arm repair, custom frame welding, or replacing sun-faded canvas, request a site visit from Sayad Handyman Awning Technicians.'
  },
  {
    id: 'tip-waterproofing-leak-detection',
    slug: 'detect-prevent-wall-water-leaks',
    title: 'Detecting Hidden Wall Leaks & Concrete Waterproofing Essentials',
    category: 'Plumbing & Waterproofing',
    relatedServiceId: 'waterproofing-leak',
    readTime: '7 min read',
    publishedDate: 'Aug 1, 2026',
    author: 'Waterproofing Engineer Sayad',
    coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    iconName: 'Droplets',
    difficulty: 'Moderate',
    summary: 'Peeling wall paint, yellow ceiling stains, and musty odor indicate moisture leakage. Learn how to locate leaks early before structural damage spreads.',
    tags: ['Waterproofing', 'Leak Detection', 'Plumbing', 'Concrete Repair'],
    sections: [
      {
        heading: '1. The Water Meter Test for Hidden Pipe Leaks',
        content: 'To verify if you have an active concealed plumbing pipe leak behind walls:',
        bullets: [
          'Turn off all faucets, washing machines, and toilets.',
          'Check your main water meter. Note the exact gauge number.',
          'Wait 2 hours without using any water. If the meter digits moved, there is a hidden pipe leak.'
        ]
      },
      {
        heading: '2. Inspecting Bathroom Floor Tile Grout',
        content: 'Hairline cracks in tile grout allow shower water to seep into sub-floor concrete slabs, leaking onto lower-floor ceilings. Re-grouting epoxy prevents thousands in slab repair.'
      },
      {
        heading: '3. Roof Slab Polyurethane Injection',
        content: 'Flat concrete roofs expand and contract in tropical weather, forming hairline micro-fissures that absorb monsoon rains.'
      }
    ],
    proTip: 'Never paint over damp wall moisture spots with regular paint! Paint will bubble and peel off within weeks unless the root source leakage is sealed first.',
    whenToCallPro: 'For thermal imaging leak detection, high-pressure polyurethane (PU) grout injection, and chemical membrane waterproofing, book Sayad Handyman Waterproofing Team.'
  }
];
