import express from 'express';
import { getStats, getTestimonials, createTestimonial } from '../controllers/statsController.js';

const router = express.Router();

router.get('/stats',         getStats);
router.get('/testimonials',  getTestimonials);
router.post('/testimonials', createTestimonial);

export default router;
