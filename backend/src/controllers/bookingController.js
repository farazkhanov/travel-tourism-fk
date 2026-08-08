import Booking from '../models/Booking.js';
import User from '../models/User.js';

const PACKAGES = {
  basic:    { name: 'Basic Package',    price: 55000 },
  standard: { name: 'Standard Package', price: 97000 },
  premium:  { name: 'Premium Package',  price: 167000 },
  custom:   { name: 'Custom Package',   price: 0 }
};

// POST /api/bookings
export const createBooking = async (req, res) => {
  try {
    const pkg = PACKAGES[req.body.package];
    const adults = parseInt(req.body.adults) || 1;
    const totalPrice = pkg ? pkg.price * adults : 0;

    const booking = await Booking.create({
      ...req.body,
      packageName: pkg?.name,
      totalPrice,
      userId: req.user?.id || null,
      status: 'pending'
    });

    // Increment user bookingsCount if logged in
    if (req.user?.id) {
      const user = await User.findById(req.user.id);
      await User.findByIdAndUpdate(req.user.id, { bookings_count: (user.bookings_count || 0) + 1 });
    }

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/bookings  (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/bookings/my
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/bookings/:id/status  (admin)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status }
    );
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE /api/bookings/:id  (admin)
export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
