import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

class User {
  // Create a new user
  static async create(userData) {
    const { name, email, password, role = 'user' } = userData;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const result = await query(
      `INSERT INTO users (name, email, password, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, role, bookings_count, reviews_count`,
      [name, email, hashedPassword, role]
    );
    
    return result.rows[0];
  }

  // Find user by email
  static async findOne(email) {
    const result = await query(
      `SELECT id, name, email, password, role, avatar, bookings_count, reviews_count, created_at, updated_at 
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  // Find user by ID
  static async findById(id) {
    const result = await query(
      `SELECT id, name, email, role, avatar, bookings_count, reviews_count, created_at, updated_at 
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  // Find user with password (for login)
  static async findOneWithPassword(email) {
    const result = await query(
      `SELECT id, name, email, password, role, avatar, bookings_count, reviews_count 
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  }

  // Compare password
  static async comparePassword(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  // Get all users
  static async find() {
    const result = await query(
      `SELECT id, name, email, role, avatar, bookings_count, reviews_count, created_at, updated_at 
       FROM users ORDER BY created_at DESC`
    );
    return result.rows;
  }

  // Update user
  static async findByIdAndUpdate(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    values.push(id);
    
    const result = await query(
      `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, name, email, role, avatar, bookings_count, reviews_count`,
      values
    );
    
    return result.rows[0] || null;
  }

  // Delete user
  static async findByIdAndDelete(id) {
    const result = await query(
      `DELETE FROM users WHERE id = $1 RETURNING id`,
      [id]
    );
    return result.rows[0] || null;
  }
}

export default User;
