import { query } from '../config/database.js';

class Testimonial {
  // Create a new testimonial
  static async create(testimonialData) {
    const {
      name,
      location,
      image = '',
      rating,
      text,
      approved = false
    } = testimonialData;

    const result = await query(
      `INSERT INTO testimonials (name, location, image, rating, text, approved) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, name, location, image, rating, text, approved, created_at, updated_at`,
      [name, location, image, rating, text, approved]
    );

    return result.rows[0];
  }

  // Find testimonial by ID
  static async findById(id) {
    const result = await query(
      `SELECT id, name, location, image, rating, text, approved, created_at, updated_at 
       FROM testimonials WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  // Find all testimonials
  static async find(filter = {}) {
    let sql = `SELECT id, name, location, image, rating, text, approved, created_at, updated_at FROM testimonials`;
    const params = [];
    const conditions = [];

    if (filter.approved !== undefined) {
      conditions.push(`approved = $${params.length + 1}`);
      params.push(filter.approved);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY created_at DESC`;

    const result = await query(sql, params);
    return result.rows;
  }

  // Update testimonial
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
      `UPDATE testimonials SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, name, location, image, rating, text, approved, created_at, updated_at`,
      values
    );

    return result.rows[0] || null;
  }

  // Delete testimonial
  static async findByIdAndDelete(id) {
    const result = await query(`DELETE FROM testimonials WHERE id = $1 RETURNING id`, [id]);
    return result.rows[0] || null;
  }

  // Get approved testimonials
  static async getApproved() {
    const result = await query(
      `SELECT id, name, location, image, rating, text, approved FROM testimonials WHERE approved = true ORDER BY created_at DESC`
    );
    return result.rows;
  }

  // Get pending testimonials
  static async getPending() {
    const result = await query(
      `SELECT id, name, location, image, rating, text, approved FROM testimonials WHERE approved = false ORDER BY created_at DESC`
    );
    return result.rows;
  }
}

export default Testimonial;
