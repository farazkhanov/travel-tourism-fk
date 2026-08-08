import { query } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const clearPlaces = async () => {
  try {
    console.log('🧹 Clearing existing places...');
    
    // Delete all places (cascade will handle images and activities)
    await query(`DELETE FROM places;`);
    
    console.log('✅ All places cleared successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Clear error:', err.message);
    process.exit(1);
  }
};

clearPlaces();
