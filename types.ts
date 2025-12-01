export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  features: string[];
  imageUrl: string;
  lat?: number;
  lng?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  groundingLinks?: GroundingLink[];
}

export interface GroundingLink {
  title: string;
  uri: string;
  source: string;
}

export enum AppView {
  BROWSE = 'BROWSE',
  AI_FINDER = 'AI_FINDER',
  ABOUT = 'ABOUT'
}