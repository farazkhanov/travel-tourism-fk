import { query } from '../config/database.js';

const migratePaymentFields = async () => {
  try {
    console.log('🔄 Adding payment fields to bookings table...');

    // Add transaction_id column if it doesn't exist
    await query(`
      ALTER TABLE bookings 
      ADD COLUMN IF NOT EXISTS transaction_id VARCHAR(255);
    `);
    console.log('✅ Added transaction_id column');

    // Add payment_screenshot column if it doesn't exist
    await query(`
      ALTER TABLE bookings 
      ADD COLUMN IF NOT EXISTS payment_screenshot VARCHAR(255);
    `);
    console.log('✅ Added payment_screenshot column');

    console.log('✅ Payment fields migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    process.exit(1);
  }
};

migratePaymentFields();
