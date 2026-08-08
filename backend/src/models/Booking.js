import { query } from '../config/database.js';

class Booking {
  // Create a new booking
  static async create(bookingData) {
    const {
      firstName,
      lastName,
      email,
      phone,
      cnic = '',
      destination,
      departureCity,
      travelDate,
      returnDate,
      adults = 1,
      children = 0,
      specialRequests = '',
      package: packageType,
      packageName,
      totalPrice = 0,
      totalAmount = 0,
      paymentMethod = 'bank',
      paymentStatus = 'pending',
      transactionId = null,
      paymentScreenshot = null,
      status = 'pending',
      userId = null
    } = bookingData;

    // Use totalAmount if provided, otherwise use totalPrice
    const finalPrice = totalAmount || totalPrice;

    const result = await query(
      `INSERT INTO bookings (first_name, last_name, email, phone, cnic, destination, departure_city, travel_date, return_date, adults, children, special_requests, package, package_name, total_price, payment_method, payment_status, transaction_id, payment_screenshot, status, user_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) 
       RETURNING id, first_name, last_name, email, phone, cnic, destination, departure_city, travel_date, return_date, adults, children, special_requests, package, package_name, total_price, payment_method, payment_status, transaction_id, payment_screenshot, status, user_id, created_at, updated_at`,
      [firstName, lastName, email, phone, cnic, destination, departureCity, travelDate, returnDate, adults, children, specialRequests, packageType, packageName, finalPrice, paymentMethod, paymentStatus, transactionId, paymentScreenshot, status, userId]
    );

    return result.rows[0];
  }

  // Find booking by ID
  static async findById(id) {
    const result = await query(
      `SELECT id, first_name, last_name, email, phone, cnic, destination, departure_city, travel_date, return_date, adults, children, special_requests, package, package_name, total_price, payment_method, payment_status, transaction_id, payment_screenshot, status, user_id, created_at, updated_at 
       FROM bookings WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  // Find all bookings
  static async find(filter = {}) {
    let sql = `SELECT id, first_name, last_name, email, phone, cnic, destination, departure_city, travel_date, return_date, adults, children, special_requests, package, package_name, total_price, payment_method, payment_status, transaction_id, payment_screenshot, status, user_id, created_at, updated_at FROM bookings`;
    const params = [];
    const conditions = [];

    if (filter.userId) {
      conditions.push(`user_id = $${params.length + 1}`);
      params.push(filter.userId);
    }
    if (filter.status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(filter.status);
    }
    if (filter.email) {
      conditions.push(`email = $${params.length + 1}`);
      params.push(filter.email);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY created_at DESC`;

    const result = await query(sql, params);
    return result.rows;
  }

  // Update booking
  static async findByIdAndUpdate(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    const fieldMap = {
      firstName: 'first_name',
      lastName: 'last_name',
      email: 'email',
      phone: 'phone',
      cnic: 'cnic',
      destination: 'destination',
      departureCity: 'departure_city',
      travelDate: 'travel_date',
      returnDate: 'return_date',
      adults: 'adults',
      children: 'children',
      specialRequests: 'special_requests',
      package: 'package',
      packageName: 'package_name',
      totalPrice: 'total_price',
      paymentMethod: 'payment_method',
      paymentStatus: 'payment_status',
      transactionId: 'transaction_id',
      paymentScreenshot: 'payment_screenshot',
      status: 'status',
      userId: 'user_id'
    };

    for (const [key, value] of Object.entries(updateData)) {
      const dbField = fieldMap[key] || key;
      fields.push(`${dbField} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    values.push(id);

    const result = await query(
      `UPDATE bookings SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, first_name, last_name, email, phone, cnic, destination, departure_city, travel_date, return_date, adults, children, special_requests, package, package_name, total_price, payment_method, payment_status, transaction_id, payment_screenshot, status, user_id`,
      values
    );

    return result.rows[0] || null;
  }

  // Delete booking
  static async findByIdAndDelete(id) {
    const result = await query(`DELETE FROM bookings WHERE id = $1 RETURNING id`, [id]);
    return result.rows[0] || null;
  }

  // Get booking count for user
  static async countByUserId(userId) {
    const result = await query(
      `SELECT COUNT(*) as count FROM bookings WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0].count;
  }

  // Get stats
  static async getStats() {
    const result = await query(`
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed_bookings,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_bookings,
        SUM(CASE WHEN payment_status = 'paid' THEN total_price ELSE 0 END) as total_revenue
      FROM bookings
    `);
    return result.rows[0];
  }
}

export default Booking;
