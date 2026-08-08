import { query } from './database.js';

const initializeSchema = async () => {
  try {
    console.log('🔄 Initializing PostgreSQL schema...');

    // Create Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        avatar VARCHAR(255) DEFAULT '',
        bookings_count INTEGER DEFAULT 0,
        reviews_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // Create Places table
    await query(`
      CREATE TABLE IF NOT EXISTS places (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        province VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) DEFAULT 0,
        average_rating DECIMAL(3, 1) DEFAULT 0,
        best_time_to_visit VARCHAR(255) DEFAULT '',
        tag VARCHAR(100) DEFAULT '',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Places table created');

    // Create Place Images table
    await query(`
      CREATE TABLE IF NOT EXISTS place_images (
        id SERIAL PRIMARY KEY,
        place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Place Images table created');

    // Create Place Activities table
    await query(`
      CREATE TABLE IF NOT EXISTS place_activities (
        id SERIAL PRIMARY KEY,
        place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        activity VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Place Activities table created');

    // Create Ratings table
    await query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id SERIAL PRIMARY KEY,
        place_id INTEGER NOT NULL REFERENCES places(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Ratings table created');

    // Create Bookings table
    await query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        cnic VARCHAR(20) DEFAULT '',
        destination VARCHAR(255) NOT NULL,
        departure_city VARCHAR(100) NOT NULL,
        travel_date DATE NOT NULL,
        return_date DATE NOT NULL,
        adults INTEGER DEFAULT 1,
        children INTEGER DEFAULT 0,
        special_requests TEXT DEFAULT '',
        package VARCHAR(50) NOT NULL,
        package_name VARCHAR(255),
        total_price DECIMAL(10, 2) DEFAULT 0,
        payment_method VARCHAR(50) DEFAULT 'bank',
        payment_status VARCHAR(50) DEFAULT 'pending',
        transaction_id VARCHAR(255),
        payment_screenshot VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Bookings table created');

    // Create Contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) DEFAULT 'General Inquiry',
        message TEXT NOT NULL,
        read_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Contacts table created');

    // Create Testimonials table
    await query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        image VARCHAR(255) DEFAULT '',
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        text TEXT NOT NULL,
        approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Testimonials table created');

    // Create indexes for better performance
    await query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_ratings_place_id ON ratings(place_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);`);
    await query(`CREATE INDEX IF NOT EXISTS idx_place_images_place_id ON place_images(place_id);`);
    console.log('✅ Indexes created');

    console.log('✅ PostgreSQL schema initialized successfully');
  } catch (error) {
    console.error('❌ Schema initialization error:', error.message);
    throw error;
  }
};

export default initializeSchema;
