export interface Service {
  id: string;
  slug: string;
  name: string;
  category: 'appliances' | 'tech' | 'structure' | 'plumbing';
  shortDesc: string;
  fullDesc: string;
  iconName: string; // Lucide icon identifier
  image: string;
  estimatedPrice: string;
  usdMin: number;
  usdMax: number;
  duration: string;
  commonProblems: {
    issue: string;
    description: string;
    symptom: string;
  }[];
  ourSolution: string[];
  benefits: string[];
  whyChooseUs: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  message: string;
}

export interface BookingConfirmation extends BookingData {
  id: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
  totalEstimate?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export type PageView = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'booking'
  | 'contact'
  | 'estimator'
  | 'tips';

export interface ExpertTip {
  id: string;
  title: string;
  slug: string;
  category: string;
  relatedServiceId?: string;
  readTime: string;
  publishedDate: string;
  author: string;
  summary: string;
  coverImage: string;
  iconName: string;
  difficulty: 'Easy DIY' | 'Moderate' | 'Pro Required';
  tags: string[];
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
  }[];
  proTip?: string;
  whenToCallPro: string;
}
