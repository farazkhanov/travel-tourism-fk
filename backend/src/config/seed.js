import dotenv from 'dotenv';
import Place from '../models/Place.js';
import User from '../models/User.js';
import Testimonial from '../models/Testimonial.js';
import { pool } from './database.js';

dotenv.config();

const places = [
  {
    name: 'Hunza Valley',
    province: 'Gilgit-Baltistan',
    category: 'Northern Areas',
    description: 'Breathtaking valley with fairy-tale landscapes, ancient Baltit Fort, and warm hospitality. Surrounded by towering peaks including Rakaposhi and Ultar Sar.',
    price: 80,
    images: [
      'https://images.unsplash.com/photo-1584474728358-e0b930d3e4a7?w=800&q=80',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80'
    ],
    averageRating: 4.9,
    bestTimeToVisit: 'April to October',
    activities: ['Hiking', 'Cultural Tours', 'Photography', 'Trekking'],
    tag: 'Most Popular',
    featured: true
  },
  {
    name: 'Skardu & Deosai Plains',
    province: 'Gilgit-Baltistan',
    category: 'Northern Areas',
    description: 'Gateway to K2 and the stunning Deosai National Park — the world\'s second highest plateau. Home to Satpara Lake, Shangrila Resort, and Shigar Fort.',
    price: 90,
    images: [
      'https://images.unsplash.com/photo-1580982172477-9373ff52ae43?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    ],
    averageRating: 5.0,
    bestTimeToVisit: 'May to September',
    activities: ['Trekking', 'Boat Rides', 'Wildlife Safari', 'Photography'],
    tag: 'Top Rated',
    featured: true
  },
  {
    name: 'Fairy Meadows',
    province: 'Gilgit-Baltistan',
    category: 'Adventure Spots',
    description: 'A stunning alpine meadow at the base of Nanga Parbat (8,126m), the world\'s 9th highest peak. Accessible by jeep and a 3-hour trek through dense forests.',
    price: 40,
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80'
    ],
    averageRating: 4.9,
    bestTimeToVisit: 'June to September',
    activities: ['Trekking', 'Camping', 'Photography', 'Mountaineering'],
    tag: 'Adventure',
    featured: true
  },
  {
    name: 'Swat Valley',
    province: 'Khyber Pakhtunkhwa',
    category: 'Northern Areas',
    description: 'Known as the Switzerland of Pakistan, Swat Valley offers lush green valleys, crystal-clear rivers, and the famous Malam Jabba ski resort.',
    price: 60,
    images: [
      'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80'
    ],
    averageRating: 4.8,
    bestTimeToVisit: 'April to October',
    activities: ['River Rafting', 'Hiking', 'Skiing', 'Cultural Tours'],
    tag: 'Family Friendly',
    featured: true
  },
  {
    name: 'Naran & Kaghan Valley',
    province: 'Khyber Pakhtunkhwa',
    category: 'Northern Areas',
    description: 'Famous for the magical Lake Saif-ul-Malook and Lulusar Lake. The valley offers stunning mountain scenery, waterfalls, and the high-altitude Babusar Pass.',
    price: 50,
    images: [
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80'
    ],
    averageRating: 4.7,
    bestTimeToVisit: 'June to September',
    activities: ['Boating', 'Hiking', 'Photography', 'Camping'],
    tag: 'Scenic',
    featured: true
  },
  {
    name: 'Lahore',
    province: 'Punjab',
    category: 'Cultural Places',
    description: 'The cultural heart of Pakistan, home to Mughal masterpieces including Badshahi Mosque, Lahore Fort, and the vibrant Walled City with its famous Food Street.',
    price: 30,
    images: [
      'https://images.unsplash.com/photo-1598608925229-14e1d4c5c2f7?w=800&q=80'
    ],
    averageRating: 4.8,
    bestTimeToVisit: 'October to March',
    activities: ['Heritage Walk', 'Food Tours', 'Shopping', 'Cultural Tours'],
    tag: 'Cultural',
    featured: true
  },
  {
    name: 'Badshahi Mosque',
    province: 'Punjab',
    category: 'Historical Sites',
    description: 'One of the largest mosques in the world, built by Mughal Emperor Aurangzeb in 1673. A stunning example of Mughal architecture with capacity for 100,000 worshippers.',
    price: 0,
    images: [
      'https://images.unsplash.com/photo-1598608925229-14e1d4c5c2f7?w=800&q=80'
    ],
    averageRating: 4.9,
    bestTimeToVisit: 'October to March',
    activities: ['Sightseeing', 'Photography', 'History Tours'],
    tag: 'Free Entry'
  },
  {
    name: 'Faisal Mosque',
    province: 'Islamabad',
    category: 'Religious Sites',
    description: 'The iconic national mosque of Pakistan, shaped like a Bedouin tent. Located at the foot of the Margalla Hills, it is one of the largest mosques in the world.',
    price: 0,
    images: [
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80'
    ],
    averageRating: 4.9,
    bestTimeToVisit: 'Year-round',
    activities: ['Sightseeing', 'Photography', 'Spiritual Tours'],
    tag: 'Free Entry'
  },
  {
    name: 'Mohenjo-Daro',
    province: 'Sindh',
    category: 'Historical Sites',
    description: 'A UNESCO World Heritage Site and one of the world\'s earliest major urban settlements, dating back to 2500 BCE. Part of the ancient Indus Valley Civilization.',
    price: 10,
    images: [
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80'
    ],
    averageRating: 4.7,
    bestTimeToVisit: 'November to March',
    activities: ['Archaeological Tours', 'Museum Visit', 'Photography'],
    tag: 'UNESCO Heritage'
  },
  {
    name: 'Chitral & Kalash Valleys',
    province: 'Khyber Pakhtunkhwa',
    category: 'Cultural Places',
    description: 'Home to the unique Kalash people with their ancient pre-Islamic culture, colorful festivals, and distinctive traditions. Surrounded by the Hindu Kush mountains.',
    price: 70,
    images: [
      'https://images.unsplash.com/photo-1584474728358-e0b930d3e4a7?w=800&q=80'
    ],
    averageRating: 4.8,
    bestTimeToVisit: 'May to October',
    activities: ['Cultural Tours', 'Festival Visits', 'Trekking', 'Photography'],
    tag: 'Unique Culture'
  }
];

const testimonials = [
  {
    name: 'Ahmed Khan',
    location: 'Karachi, Pakistan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    text: 'An unforgettable journey through Hunza Valley! The organization was perfect and our guide was incredibly knowledgeable about local culture and history.',
    approved: true
  },
  {
    name: 'Sarah Williams',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    rating: 5,
    text: 'Pakistan exceeded all my expectations! The landscapes are breathtaking and the hospitality is unmatched. This tour company made everything seamless.',
    approved: true
  },
  {
    name: 'Ali Hassan',
    location: 'Islamabad, Pakistan',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    rating: 5,
    text: 'Best adventure of my life! From Fairy Meadows to Skardu, every moment was magical. Highly professional team and excellent safety measures.',
    approved: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing data
    await Place.deleteMany();
    await Testimonial.deleteMany();
    console.log('Cleared existing data...');

    // Seed places
    await Place.insertMany(places);
    console.log(`✅ Seeded ${places.length} places`);

    // Seed testimonials
    await Testimonial.insertMany(testimonials);
    console.log(`✅ Seeded ${testimonials.length} testimonials`);

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@wanderlux.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@wanderlux.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created: admin@wanderlux.com / admin123');
    }

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
