import express from 'express';
import {
  createBooking, getAllBookings, getMyBookings, updateStatus, deleteBooking
} from '../controllers/bookingController.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/',          optionalAuth, createBooking);
router.get('/',           protect, adminOnly, getAllBookings);
router.get('/my',         protect, getMyBookings);
router.patch('/:id/status', protect, adminOnly, updateStatus);
router.delete('/:id',    protect, adminOnly, deleteBooking);

export default router;
