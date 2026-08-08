import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const places = [
  {
    name: 'Hunza Valley',
    province: 'Gilgit-Baltistan',
    category: 'Northern Areas',
    description: 'Breathtaking valley with fairy-tale landscapes, ancient Baltit Fort, and warm hospitality. Surrounded by towering peaks including Rakaposhi and Ultar Sar.',
    price: 80,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
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
      'https://images.unsplash.com/photo-1580982172477-9373ff52ae43?w=1000&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85&auto=format&fit=crop'
    ],
    averageRating: 5.0,
    bestTimeToVisit: 'May to September',
    activities: ['Trekking', 'Boat Rides', 'Wildlife Safari', 'Photography'],
    tag: 'Top Rated',
    featured: true
  },
  {
    name: 'Attabad Lake',
    province: 'Gilgit-Baltistan',
    category: 'Northern Areas',
    description: 'A stunning turquoise lake nestled in the Gojal region, surrounded by majestic mountains. Formed in 2010, it has become a pristine tourism destination with breathtaking views.',
    price: 45,
    images: [
      'https://images.unsplash.com/photo-1506704720897-c6b0b8ef0bbb?w=1000&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1000&q=85&auto=format&fit=crop'
    ],
    averageRating: 4.8,
    bestTimeToVisit: 'April to October',
    activities: ['Boat Rides', 'Photography', 'Picnicking', 'Mountain Viewing'],
    tag: 'Scenic Beauty',
    featured: true
  },
  {
    name: 'Fairy Meadows',
    province: 'Gilgit-Baltistan',
    category: 'Adventure Spots',
    description: 'A stunning alpine meadow at the base of Nanga Parbat (8,126m), the world\'s 9th highest peak. Accessible by jeep and a 3-hour trek through dense forests.',
    price: 40,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
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
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
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
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
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
      'https://images.unsplash.com/photo-1488747807830-63789f68bb65?w=800&q=80'
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
      'https://images.unsplash.com/photo-1488747807830-63789f68bb65?w=800&q=80'
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
      'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=800&q=80'
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
      'https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=800&q=80'
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
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
    ],
    averageRating: 4.8,
    bestTimeToVisit: 'May to October',
    activities: ['Cultural Tours', 'Festival Visits', 'Trekking', 'Photography'],
    tag: 'Unique Culture'
  }
];

const seedPlaces = async () => {
  try {
    console.log('🌱 Starting to seed places...');
    
    for (const place of places) {
      try {
        // Insert place
        const placeResult = await query(
          `INSERT INTO places (name, province, category, description, price, average_rating, best_time_to_visit, tag, featured)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING id`,
          [place.name, place.province, place.category, place.description, place.price, place.averageRating, place.bestTimeToVisit, place.tag, place.featured]
        );
        
        const placeId = placeResult.rows[0].id;
        console.log(`✅ Created place: ${place.name} (ID: ${placeId})`);
        
        // Insert images
        for (const imageUrl of place.images) {
          await query(
            `INSERT INTO place_images (place_id, image_url) VALUES ($1, $2)`,
            [placeId, imageUrl]
          );
        }
        console.log(`   ✅ Added ${place.images.length} images`);
        
        // Insert activities
        for (const activity of place.activities) {
          await query(
            `INSERT INTO place_activities (place_id, activity) VALUES ($1, $2)`,
            [placeId, activity]
          );
        }
        console.log(`   ✅ Added ${place.activities.length} activities`);
        
      } catch (err) {
        console.error(`❌ Error seeding ${place.name}:`, err.message);
      }
    }
    
    console.log('\n🎉 Database seeded successfully with places!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedPlaces();
