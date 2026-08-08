import Place from '../models/Place.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Testimonial from '../models/Testimonial.js';
import { query } from '../config/database.js';

// GET /api/stats
export const getStats = async (req, res) => {
  try {
    const [placesRes, usersRes, bookingsRes, testimonialsRes] = await Promise.all([
      query(`SELECT COUNT(*) as count FROM places`),
      query(`SELECT COUNT(*) as count FROM users`),
      query(`SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'`),
      query(`SELECT COUNT(*) as count FROM testimonials WHERE approved = true`)
    ]);

    const destinations = placesRes.rows[0].count || 0;
    const travelers = usersRes.rows[0].count || 0;
    const bookings = bookingsRes.rows[0].count || 0;
    const testimonials = testimonialsRes.rows[0].count || 0;

    res.json({
      success: true,
      data: {
        destinations: destinations || 500,
        travelers: travelers || 10000,
        toursCompleted: bookings || 2500,
        rating: 4.9
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.getApproved();
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/testimonials
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
