import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

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
  },
  {
    name: 'Maria Garcia',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    rating: 5,
    text: 'Deosai Plains left me speechless! The vastness and beauty of the landscape is beyond words. Highly recommend this tour operator!',
    approved: true
  },
  {
    name: 'Hassan Malik',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 4,
    text: 'Amazing experience with professional guides and comfortable accommodations. Will definitely book again for the next trip.',
    approved: true
  }
];

const seedTestimonials = async () => {
  try {
    console.log('🌱 Seeding testimonials...');
    
    for (const testimonial of testimonials) {
      await query(
        `INSERT INTO testimonials (name, location, image, rating, text, approved)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [testimonial.name, testimonial.location, testimonial.image, testimonial.rating, testimonial.text, testimonial.approved]
      );
    }
    
    console.log(`✅ Seeded ${testimonials.length} testimonials`);
    console.log('🎉 Done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedTestimonials();
