import { pool } from './database.js';
import initializeSchema from './schema.js';

const connectDB = async () => {
  try {
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log(`✅ PostgreSQL Connected: ${result.rows[0].now}`);
    
    // Initialize schema
    await initializeSchema();
  } catch (error) {
    console.error(`❌ PostgreSQL Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
