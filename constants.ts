import { StoreLocation } from './types';

// A curated list of BookOff USA locations for the "Browse" feature
export const STORES: StoreLocation[] = [
  {
    id: 'nyc-49',
    name: 'New York 49th St',
    address: '49 W 45th St',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    phone: '(212) 685-1410',
    hours: '10:00 AM - 8:00 PM',
    features: ['Books', 'CDs/DVDs', 'Video Games', 'Figures', 'Apparel'],
    imageUrl: 'https://picsum.photos/seed/nyc49/800/600',
    lat: 40.756,
    lng: -73.981
  },
  {
    id: 'brooklyn',
    name: 'Industry City',
    address: '241 37th St, Suite A212',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11232',
    phone: '(347) 534-7707',
    hours: '11:00 AM - 7:00 PM',
    features: ['Anime Goods', 'Rare Vinyl', 'Lounge Area'],
    imageUrl: 'https://picsum.photos/seed/brooklyn/800/600',
    lat: 40.656,
    lng: -74.007
  },
  {
    id: 'gardena',
    name: 'Gardena',
    address: '1610 W Redondo Beach Blvd',
    city: 'Gardena',
    state: 'CA',
    zip: '90247',
    phone: '(310) 532-5010',
    hours: '10:00 AM - 9:00 PM',
    features: ['Large Selection', 'Free Parking', 'Electronics'],
    imageUrl: 'https://picsum.photos/seed/gardena/800/600',
    lat: 33.886,
    lng: -118.305
  },
  {
    id: 'costa-mesa',
    name: 'Costa Mesa',
    address: '2955 Harbor Blvd',
    city: 'Costa Mesa',
    state: 'CA',
    zip: '92626',
    phone: '(714) 557-6300',
    hours: '10:00 AM - 8:00 PM',
    features: ['Japanese Books', 'Hobby Goods', 'Buying Center'],
    imageUrl: 'https://picsum.photos/seed/costamesa/800/600',
    lat: 33.676,
    lng: -117.919
  },
  {
    id: 'ala-moana',
    name: 'Ala Moana Center',
    address: '1450 Ala Moana Blvd',
    city: 'Honolulu',
    state: 'HI',
    zip: '96814',
    phone: '(808) 947-6577',
    hours: '10:00 AM - 8:00 PM',
    features: ['Tourist Friendly', 'Souvenirs', 'Premium Collection'],
    imageUrl: 'https://picsum.photos/seed/alamoana/800/600',
    lat: 21.291,
    lng: -157.843
  },
  {
    id: 'pearlridge',
    name: 'Pearlridge Center',
    address: '98-1005 Moanalua Rd',
    city: 'Aiea',
    state: 'HI',
    zip: '96701',
    phone: '(808) 488-6990',
    hours: '10:00 AM - 9:00 PM',
    features: ['Family Friendly', 'Large Manga Section'],
    imageUrl: 'https://picsum.photos/seed/pearlridge/800/600',
    lat: 21.383,
    lng: -157.942
  },
  {
    id: 'plano',
    name: 'Plano',
    address: '101 Legacy Dr',
    city: 'Plano',
    state: 'TX',
    zip: '75023',
    phone: '(972) 517-5677',
    hours: '10:00 AM - 8:00 PM',
    features: ['New Arrival', 'Spacious'],
    imageUrl: 'https://picsum.photos/seed/plano/800/600',
    lat: 33.073,
    lng: -96.702
  }
];

export const STATES = Array.from(new Set(STORES.map(s => s.state))).sort();