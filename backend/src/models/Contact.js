import { query } from '../config/database.js';

class Contact {
  // Create a new contact message
  static async create(contactData) {
    const {
      name,
      email,
      subject = 'General Inquiry',
      message
    } = contactData;

    const result = await query(
      `INSERT INTO contacts (name, email, subject, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, subject, message, read_at, created_at, updated_at`,
      [name, email, subject, message]
    );

    return result.rows[0];
  }

  // Find contact by ID
  static async findById(id) {
    const result = await query(
      `SELECT id, name, email, subject, message, read_at, created_at, updated_at 
       FROM contacts WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  // Find all contacts
  static async find(filter = {}) {
    let sql = `SELECT id, name, email, subject, message, read_at, created_at, updated_at FROM contacts`;
    const params = [];
    const conditions = [];

    if (filter.read === false) {
      conditions.push(`read_at IS NULL`);
    } else if (filter.read === true) {
      conditions.push(`read_at IS NOT NULL`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY created_at DESC`;

    const result = await query(sql, params);
    return result.rows;
  }

  // Update contact
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
      `UPDATE contacts SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, name, email, subject, message, read_at, created_at, updated_at`,
      values
    );

    return result.rows[0] || null;
  }

  // Mark as read
  static async markAsRead(id) {
    return this.findByIdAndUpdate(id, { read_at: new Date() });
  }

  // Delete contact
  static async findByIdAndDelete(id) {
    const result = await query(`DELETE FROM contacts WHERE id = $1 RETURNING id`, [id]);
    return result.rows[0] || null;
  }

  // Get unread count
  static async getUnreadCount() {
    const result = await query(`SELECT COUNT(*) as count FROM contacts WHERE read_at IS NULL`);
    return result.rows[0].count;
  }
}

export default Contact;
