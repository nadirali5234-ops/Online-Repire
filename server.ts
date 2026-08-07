import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

interface BookingRecord {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  message?: string;
  status: 'Confirmed' | 'Technician Dispatched' | 'In Progress' | 'Completed' | 'Cancelled';
  assignedTechnician: string;
  estimatedArrival: string;
  totalEstimate: string;
  createdAt: string;
}

interface ContactRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
  readStatus: boolean;
}

// In-memory data persistence stores
const bookingsStore: BookingRecord[] = [
  {
    id: 'SH-2026-1042',
    fullName: 'Ahmad Razak',
    phone: '+60 12-345 6789',
    email: 'ahmad@example.com',
    serviceId: 'appliance-fridge',
    serviceName: 'Refrigerator & Fridge Repair',
    preferredDate: '2026-08-08',
    preferredTime: 'Morning (8:00 AM - 12:00 PM)',
    address: 'No 14, Jalan Ampang 3, Taman Lake View, Kuala Lumpur',
    message: 'Fridge is not cooling properly and making buzzing fan noise.',
    status: 'Confirmed',
    assignedTechnician: 'Master Tech Sayad',
    estimatedArrival: 'Tomorrow at 9:30 AM',
    totalEstimate: 'RM 120 - RM 220',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'SH-2026-1088',
    fullName: 'Siti Nurhaliza',
    phone: '+60 17-889 2311',
    email: 'siti@example.com',
    serviceId: 'aircond-service',
    serviceName: 'Air Conditioner Service & Repair',
    preferredDate: '2026-08-07',
    preferredTime: 'Afternoon (12:00 PM - 4:00 PM)',
    address: 'B-12-05, Mont Kiara Pines Condominium, Mont Kiara',
    message: 'Master bedroom AC leaking water drops on wood floor.',
    status: 'Technician Dispatched',
    assignedTechnician: 'Cooling Lead Amir',
    estimatedArrival: 'Today at 2:15 PM',
    totalEstimate: 'RM 90 - RM 180',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

const messagesStore: ContactRecord[] = [
  {
    id: 'MSG-8801',
    name: 'Michael Tan',
    phone: '+60 16-992 4410',
    email: 'michael.tan@example.com',
    subject: 'Commercial Awning Quote',
    message: 'Need a custom 20ft retractable awning installed for restaurant storefront in Subang Jaya.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    readStatus: true
  }
];

const SERVICE_NAMES: Record<string, { name: string; basePrice: string }> = {
  'appliance-fridge': { name: 'Refrigerator & Fridge Repair', basePrice: 'RM 120 - RM 220' },
  'appliance-washer': { name: 'Washing Machine Repair', basePrice: 'RM 110 - RM 200' },
  'aircond-service': { name: 'Air Conditioner Service & Repair', basePrice: 'RM 90 - RM 180' },
  'computer-repair': { name: 'Computer & Laptop Repair', basePrice: 'RM 80 - RM 180' },
  'canvas-awning': { name: 'Custom Canvas Awning Fabrication', basePrice: 'RM 250 - RM 850' },
  'waterproofing-leak': { name: 'Waterproofing & Leak Repair', basePrice: 'RM 180 - RM 500' },
  'general-plumbing': { name: 'General Plumbing & Pipe Repair', basePrice: 'RM 80 - RM 190' }
};

const TECHNICIANS = [
  'Master Tech Sayad',
  'Tech Lead Rashid',
  'Cooling Specialist Amir',
  'IT Engineer Farhan',
  'Waterproofing Engineer Sayad',
  'Structural Specialist Tariq'
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global Middleware
  app.use(express.json());

  // ==========================================
  // BACKEND API ROUTES
  // ==========================================

  // 1. Health Check Endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Sayad Handyman Backend API',
      version: '1.2.0',
      activeBookingsCount: bookingsStore.length,
      timestamp: new Date().toISOString()
    });
  });

  // 2. Get Service Catalog & Availability Status
  app.get('/api/services', (_req, res) => {
    const servicesWithStatus = Object.entries(SERVICE_NAMES).map(([id, info]) => ({
      id,
      name: info.name,
      basePrice: info.basePrice,
      isAvailable: true,
      availableTechnicians: Math.floor(Math.random() * 3) + 2,
      nextAvailableSlot: 'Today 2:30 PM'
    }));
    res.json({ success: true, services: servicesWithStatus });
  });

  // 3. Create New Repair Booking Appointment
  app.post('/api/bookings', (req, res) => {
    try {
      const { fullName, phone, email, serviceId, preferredDate, preferredTime, address, message } = req.body;

      if (!fullName || !phone || !serviceId || !address) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: fullName, phone, serviceId, and address are mandatory.'
        });
      }

      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const bookingId = `SH-2026-${randomNum}`;
      const serviceInfo = SERVICE_NAMES[serviceId] || { name: 'General Handyman Repair', basePrice: 'RM 100 - RM 200' };
      const assignedTech = TECHNICIANS[Math.floor(Math.random() * TECHNICIANS.length)];

      const newBooking: BookingRecord = {
        id: bookingId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        serviceId,
        serviceName: serviceInfo.name,
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        preferredTime: preferredTime || 'Morning (8:00 AM - 12:00 PM)',
        address: address.trim(),
        message: message ? message.trim() : undefined,
        status: 'Confirmed',
        assignedTechnician: assignedTech,
        estimatedArrival: preferredDate ? `${preferredDate} during ${preferredTime}` : 'Within 45 minutes',
        totalEstimate: serviceInfo.basePrice,
        createdAt: new Date().toISOString()
      };

      bookingsStore.unshift(newBooking);

      console.log(`[BACKEND LOG] New Repair Booking Created: ${newBooking.id} for ${newBooking.fullName}`);

      return res.status(201).json({
        success: true,
        message: 'Repair appointment scheduled successfully!',
        booking: newBooking
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message || 'Server error creating booking.' });
    }
  });

  // 4. Track or Search Booking Status by Reference ID or Phone
  app.get('/api/bookings/track', (req, res) => {
    const query = (req.query.query as string || '').trim().toLowerCase();
    if (!query) {
      return res.status(400).json({ success: false, error: 'Please provide a reference ID or phone number to search.' });
    }

    const matches = bookingsStore.filter(b => 
      b.id.toLowerCase().includes(query) ||
      b.phone.toLowerCase().includes(query) ||
      b.fullName.toLowerCase().includes(query)
    );

    return res.json({
      success: true,
      count: matches.length,
      bookings: matches
    });
  });

  // 5. Get All Bookings
  app.get('/api/bookings', (_req, res) => {
    res.json({
      success: true,
      total: bookingsStore.length,
      bookings: bookingsStore
    });
  });

  // 6. Update Booking Status (e.g., Cancel or Complete)
  app.patch('/api/bookings/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const booking = bookingsStore.find(b => b.id.toLowerCase() === id.toLowerCase());
    if (!booking) {
      return res.status(404).json({ success: false, error: `Booking ${id} not found.` });
    }

    if (['Confirmed', 'Technician Dispatched', 'In Progress', 'Completed', 'Cancelled'].includes(status)) {
      booking.status = status;
      return res.json({
        success: true,
        message: `Booking ${id} status updated to ${status}`,
        booking
      });
    } else {
      return res.status(400).json({ success: false, error: 'Invalid status value.' });
    }
  });

  // 7. Submit Contact / Customer Message
  app.post('/api/contact', (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, phone, and message are required.' });
    }

    const msgId = `MSG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newMsg: ContactRecord = {
      id: msgId,
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      subject: subject || 'General Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      readStatus: false
    };

    messagesStore.unshift(newMsg);

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      contactId: msgId
    });
  });

  // 8. Cost Estimator Calculation API
  app.post('/api/estimator', (req, res) => {
    const { serviceId, urgency, propertyType } = req.body;

    const serviceInfo = SERVICE_NAMES[serviceId] || { name: 'General Handyman', basePrice: 'RM 100 - RM 200' };
    
    let baseMin = 100;
    let baseMax = 200;

    if (serviceId === 'appliance-fridge') { baseMin = 120; baseMax = 220; }
    else if (serviceId === 'appliance-washer') { baseMin = 110; baseMax = 200; }
    else if (serviceId === 'aircond-service') { baseMin = 90; baseMax = 180; }
    else if (serviceId === 'computer-repair') { baseMin = 80; baseMax = 180; }
    else if (serviceId === 'canvas-awning') { baseMin = 250; baseMax = 850; }
    else if (serviceId === 'waterproofing-leak') { baseMin = 180; baseMax = 500; }
    else if (serviceId === 'general-plumbing') { baseMin = 80; baseMax = 190; }

    let urgencySurcharge = 0;
    if (urgency === 'emergency') urgencySurcharge = 50;
    if (urgency === 'same-day') urgencySurcharge = 20;

    let propertyFactor = 1.0;
    if (propertyType === 'commercial') propertyFactor = 1.25;

    const calculatedMin = Math.round((baseMin + urgencySurcharge) * propertyFactor);
    const calculatedMax = Math.round((baseMax + urgencySurcharge) * propertyFactor);

    res.json({
      success: true,
      serviceId,
      serviceName: serviceInfo.name,
      estimatedPriceRange: `RM ${calculatedMin} - RM ${calculatedMax}`,
      breakdown: {
        inspectionAndLabor: `RM ${Math.round(calculatedMin * 0.6)}`,
        partsAllowance: `RM ${Math.round(calculatedMin * 0.4)} - RM ${Math.round(calculatedMax * 0.5)}`,
        dispatchSurcharge: urgencySurcharge > 0 ? `RM ${urgencySurcharge} (${urgency.toUpperCase()})` : 'Free Standard Dispatch'
      },
      warrantyDays: 90
    });
  });

  // 9. AI Repair Diagnostic Assistant Endpoint
  app.post('/api/ai-assistant', async (req, res) => {
    const { prompt, problemType } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt description is required.' });
    }

    try {
      // Check if GEMINI_API_KEY environment variable exists
      if (process.env.GEMINI_API_KEY) {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const systemInstruction = `You are Master Technician Sayad from Sayad Handyman Repair Services.
Provide a concise, helpful 3-step diagnostic assessment for home appliances, AC, plumbing, or computer repair issues.
Keep response friendly, professional, and highlight when to call our technician (+60 12-345 6789).`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\nUser reported issue: ${prompt}` }] }]
        });

        return res.json({
          success: true,
          mode: 'ai-genai',
          answer: response.text
        });
      }

      // Rule-based Fallback Diagnostic Engine if GEMINI_API_KEY is not configured
      let advice = "Based on your description, this issue typically involves component inspection or filter maintenance.";
      const lower = prompt.toLowerCase();

      if (lower.includes('fridge') || lower.includes('cooling') || lower.includes('compressor')) {
        advice = "1. Clean dirty condenser coils located under or behind the fridge.\n2. Verify the door rubber gasket seal using the dollar bill test.\n3. If compressor clicks without starting, gas refilling or starter relay replacement by Sayad Handyman is required.";
      } else if (lower.includes('washer') || lower.includes('drain') || lower.includes('spin')) {
        advice = "1. Open and clean the coin-trap drain filter at the bottom front hatch.\n2. Ensure the external drain hose is not kinked or squished.\n3. If standing water remains, your drain pump motor needs technician replacement.";
      } else if (lower.includes('ac') || lower.includes('aircond') || lower.includes('leak')) {
        advice = "1. Wash indoor mesh dust filters under warm water.\n2. Vacuum out clogged algae in the PVC condensate drain tray pipe.\n3. For chemical coil wash or gas refilling, request Sayad AC technicians.";
      }

      return res.json({
        success: true,
        mode: 'diagnostic-engine',
        answer: advice
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Error processing diagnostic assistant request.'
      });
    }
  });

  // ==========================================
  // VITE MIDDLEWARE & STATIC FILE SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BACKEND SERVER] Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('[BACKEND ERROR] Failed to start server:', err);
});
