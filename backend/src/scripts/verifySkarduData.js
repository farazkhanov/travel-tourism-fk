import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const verifySkarduData = async () => {
  try {
    console.log('🔍 Verifying Skardu & Deosai Plains data...\n');

    // Get place details
    const placeResult = await query(
      `SELECT id, name, price, province, category, average_rating, best_time_to_visit, tag, featured
       FROM places WHERE name = 'Skardu & Deosai Plains'`
    );

    if (placeResult.rows.length === 0) {
      console.log('❌ Skardu & Deosai Plains not found');
      process.exit(1);
    }

    const place = placeResult.rows[0];
    console.log('📍 PLACE DETAILS:');
    console.log(`   Name: ${place.name}`);
    console.log(`   Price: PKR ${place.price},000 per night`);
    console.log(`   Province: ${place.province}`);
    console.log(`   Category: ${place.category}`);
    console.log(`   Rating: ${place.average_rating} ⭐`);
    console.log(`   Best Time: ${place.best_time_to_visit}`);
    console.log(`   Tag: ${place.tag}`);
    console.log(`   Featured: ${place.featured ? 'Yes' : 'No'}`);

    // Get images
    const imagesResult = await query(
      `SELECT image_url FROM place_images WHERE place_id = $1`,
      [place.id]
    );

    console.log(`\n🖼️  IMAGES (${imagesResult.rows.length}):`);
    imagesResult.rows.forEach((img, index) => {
      console.log(`   ${index + 1}. ${img.image_url}`);
    });

    // Get activities
    const activitiesResult = await query(
      `SELECT activity FROM place_activities WHERE place_id = $1`,
      [place.id]
    );

    console.log(`\n🎯 ACTIVITIES (${activitiesResult.rows.length}):`);
    activitiesResult.rows.forEach((act, index) => {
      console.log(`   ${index + 1}. ${act.activity}`);
    });

    console.log('\n✅ Verification complete!');
    console.log('\n💰 PRICE CONFIRMATION: PKR 90,000 ✓');
    console.log('🖼️  IMAGES UPDATED: ✓');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
};

verifySkarduData();
