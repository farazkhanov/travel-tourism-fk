import Place from '../models/Place.js';
import User from '../models/User.js';
import { query } from '../config/database.js';

// GET /api/places
export const getPlaces = async (req, res) => {
  try {
    const { province, category, maxPrice, search, sort, limit, featured } = req.query;
    
    let sql = `SELECT * FROM places WHERE 1=1`;
    const params = [];
    let paramCount = 1;

    if (province) {
      sql += ` AND province = $${paramCount}`;
      params.push(province);
      paramCount++;
    }
    if (category) {
      sql += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }
    if (maxPrice) {
      sql += ` AND price <= $${paramCount}`;
      params.push(Number(maxPrice));
      paramCount++;
    }
    if (featured) {
      sql += ` AND featured = true`;
    }
    if (search) {
      sql += ` AND name ILIKE $${paramCount}`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (sort === 'rating') sql += ` ORDER BY average_rating DESC`;
    else if (sort === 'price_asc') sql += ` ORDER BY price ASC`;
    else if (sort === 'price_desc') sql += ` ORDER BY price DESC`;
    else sql += ` ORDER BY created_at DESC`;

    if (limit) {
      sql += ` LIMIT $${paramCount}`;
      params.push(Number(limit));
    }

    const result = await query(sql, params);
    
    // Fetch images and activities for each place
    for (const place of result.rows) {
      const imagesResult = await query(
        `SELECT image_url FROM place_images WHERE place_id = $1`,
        [place.id]
      );
      place.images = imagesResult.rows.map(r => r.image_url);

      const activitiesResult = await query(
        `SELECT activity FROM place_activities WHERE place_id = $1`,
        [place.id]
      );
      place.activities = activitiesResult.rows.map(r => r.activity);
    }

    res.json({ success: true, count: result.rows.length, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/places/:id
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found' });

    // Get user info for ratings
    for (const rating of place.ratings) {
      const userResult = await query(`SELECT name, avatar FROM users WHERE id = $1`, [rating.user_id]);
      if (userResult.rows.length > 0) {
        rating.user = userResult.rows[0];
      }
    }

    res.json({ success: true, data: place });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/places  (admin)
export const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json({ success: true, data: place });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/places/:id  (admin)
export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found' });
    res.json({ success: true, data: place });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/places/:id  (admin)
export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found' });
    res.json({ success: true, message: 'Place deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/places/:id/ratings
export const addRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found' });

    // Add or update rating
    await Place.addRating(req.params.id, req.user.id, rating, review);

    // Increment user reviewsCount
    const user = await User.findById(req.user.id);
    await User.findByIdAndUpdate(req.user.id, { reviews_count: (user.reviews_count || 0) + 1 });

    const updatedPlace = await Place.findById(req.params.id);
    res.json({ success: true, data: updatedPlace });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/places/:id/ratings
export const getRatings = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found' });

    // Get user info for ratings
    for (const rating of place.ratings) {
      const userResult = await query(`SELECT name, avatar FROM users WHERE id = $1`, [rating.user_id]);
      if (userResult.rows.length > 0) {
        rating.user = userResult.rows[0];
      }
    }

    res.json({ success: true, data: place.ratings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
