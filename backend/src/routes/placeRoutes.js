import express from 'express';
import {
  getPlaces, getPlaceById, createPlace, updatePlace, deletePlace,
  addRating, getRatings
} from '../controllers/placeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/',    getPlaces);
router.get('/:id', getPlaceById);
router.post('/',   protect, adminOnly, createPlace);
router.put('/:id', protect, adminOnly, updatePlace);
router.delete('/:id', protect, adminOnly, deletePlace);

router.get('/:id/ratings',  getRatings);
router.post('/:id/ratings', protect, addRating);

export default router;
