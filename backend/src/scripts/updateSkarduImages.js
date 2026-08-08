import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const updateSkarduImages = async () => {
  try {
    console.log('🔄 Updating Skardu & Deosai Plains images...');

    // Find the place ID for Skardu & Deosai Plains
    const placeResult = await query(
      `SELECT id FROM places WHERE name = 'Skardu & Deosai Plains'`
    );

    if (placeResult.rows.length === 0) {
      console.log('❌ Skardu & Deosai Plains not found in database');
      process.exit(1);
    }

    const placeId = placeResult.rows[0].id;
    console.log(`✅ Found Skardu & Deosai Plains (ID: ${placeId})`);

    // Delete existing images
    await query(
      `DELETE FROM place_images WHERE place_id = $1`,
      [placeId]
    );
    console.log('✅ Deleted old images');

    // Insert new images with better Skardu/Deosai photos
    const newImages = [
      'https://images.unsplash.com/photo-1580982172477-9373ff52ae43?w=1000&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=85&auto=format&fit=crop'
    ];

    for (const imageUrl of newImages) {
      await query(
        `INSERT INTO place_images (place_id, image_url) VALUES ($1, $2)`,
        [placeId, imageUrl]
      );
    }

    console.log(`✅ Added ${newImages.length} new images`);
    console.log('✅ Skardu & Deosai Plains images updated successfully!');
    console.log('\nNote: Price is already set to PKR 90,000 (90 per night in database)');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Update error:', err.message);
    process.exit(1);
  }
};

updateSkarduImages();
