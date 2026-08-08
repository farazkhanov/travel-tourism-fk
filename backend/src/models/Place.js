import { query } from '../config/database.js';

class Place {
  // Create a new place
  static async create(placeData) {
    const {
      name,
      province,
      category,
      description,
      price = 0,
      images = [],
      bestTimeToVisit = '',
      activities = [],
      tag = '',
      featured = false
    } = placeData;

    const result = await query(
      `INSERT INTO places (name, province, category, description, price, best_time_to_visit, tag, featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, name, province, category, description, price, average_rating, best_time_to_visit, tag, featured, created_at, updated_at`,
      [name, province, category, description, price, bestTimeToVisit, tag, featured]
    );

    const placeId = result.rows[0].id;

    // Add images
    for (const image of images) {
      await query(
        `INSERT INTO place_images (place_id, image_url) VALUES ($1, $2)`,
        [placeId, image]
      );
    }

    // Add activities
    for (const activity of activities) {
      await query(
        `INSERT INTO place_activities (place_id, activity) VALUES ($1, $2)`,
        [placeId, activity]
      );
    }

    return this.findById(placeId);
  }

  // Find place by ID with all details
  static async findById(id) {
    const placeResult = await query(
      `SELECT id, name, province, category, description, price, average_rating, best_time_to_visit, tag, featured, created_at, updated_at 
       FROM places WHERE id = $1`,
      [id]
    );

    if (placeResult.rows.length === 0) return null;

    const place = placeResult.rows[0];

    // Get images
    const imagesResult = await query(
      `SELECT image_url FROM place_images WHERE place_id = $1`,
      [id]
    );
    place.images = imagesResult.rows.map(r => r.image_url);

    // Get activities
    const activitiesResult = await query(
      `SELECT activity FROM place_activities WHERE place_id = $1`,
      [id]
    );
    place.activities = activitiesResult.rows.map(r => r.activity);

    // Get ratings
    const ratingsResult = await query(
      `SELECT id, user_id, rating, review, created_at, updated_at 
       FROM ratings WHERE place_id = $1 ORDER BY created_at DESC`,
      [id]
    );
    place.ratings = ratingsResult.rows;

    return place;
  }

  // Find all places
  static async find(filter = {}) {
    let sql = `SELECT id, name, province, category, description, price, average_rating, best_time_to_visit, tag, featured, created_at, updated_at FROM places`;
    const params = [];
    const conditions = [];

    if (filter.province) {
      conditions.push(`province = $${params.length + 1}`);
      params.push(filter.province);
    }
    if (filter.category) {
      conditions.push(`category = $${params.length + 1}`);
      params.push(filter.category);
    }
    if (filter.featured) {
      conditions.push(`featured = $${params.length + 1}`);
      params.push(filter.featured);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY created_at DESC`;

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

    return result.rows;
  }

  // Update place
  static async findByIdAndUpdate(id, updateData) {
    const {
      name,
      province,
      category,
      description,
      price,
      bestTimeToVisit,
      tag,
      featured,
      images = [],
      activities = []
    } = updateData;

    const fields = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      fields.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }
    if (province !== undefined) {
      fields.push(`province = $${paramCount}`);
      values.push(province);
      paramCount++;
    }
    if (category !== undefined) {
      fields.push(`category = $${paramCount}`);
      values.push(category);
      paramCount++;
    }
    if (description !== undefined) {
      fields.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    if (price !== undefined) {
      fields.push(`price = $${paramCount}`);
      values.push(price);
      paramCount++;
    }
    if (bestTimeToVisit !== undefined) {
      fields.push(`best_time_to_visit = $${paramCount}`);
      values.push(bestTimeToVisit);
      paramCount++;
    }
    if (tag !== undefined) {
      fields.push(`tag = $${paramCount}`);
      values.push(tag);
      paramCount++;
    }
    if (featured !== undefined) {
      fields.push(`featured = $${paramCount}`);
      values.push(featured);
      paramCount++;
    }

    values.push(id);

    const result = await query(
      `UPDATE places SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $${paramCount} 
       RETURNING id, name, province, category, description, price, average_rating, best_time_to_visit, tag, featured`,
      values
    );

    if (result.rows.length === 0) return null;

    const place = result.rows[0];

    // Update images if provided
    if (images.length > 0) {
      await query(`DELETE FROM place_images WHERE place_id = $1`, [id]);
      for (const image of images) {
        await query(`INSERT INTO place_images (place_id, image_url) VALUES ($1, $2)`, [id, image]);
      }
    }

    // Update activities if provided
    if (activities.length > 0) {
      await query(`DELETE FROM place_activities WHERE place_id = $1`, [id]);
      for (const activity of activities) {
        await query(`INSERT INTO place_activities (place_id, activity) VALUES ($1, $2)`, [id, activity]);
      }
    }

    place.images = images;
    place.activities = activities;

    return place;
  }

  // Delete place
  static async findByIdAndDelete(id) {
    const result = await query(`DELETE FROM places WHERE id = $1 RETURNING id`, [id]);
    return result.rows[0] || null;
  }

  // Add rating
  static async addRating(placeId, userId, rating, review) {
    await query(
      `INSERT INTO ratings (place_id, user_id, rating, review) VALUES ($1, $2, $3, $4)`,
      [placeId, userId, rating, review]
    );

    // Recalculate average rating
    const avgResult = await query(
      `SELECT AVG(rating)::NUMERIC(3,1) as average_rating FROM ratings WHERE place_id = $1`,
      [placeId]
    );

    const avgRating = avgResult.rows[0].average_rating || 0;

    await query(
      `UPDATE places SET average_rating = $1 WHERE id = $2`,
      [avgRating, placeId]
    );
  }
}

export default Place;
