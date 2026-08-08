import express from 'express';
import { sendMessage, getMessages, markRead } from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/',           sendMessage);
router.get('/',            protect, adminOnly, getMessages);
router.patch('/:id/read',  protect, adminOnly, markRead);

export default router;
