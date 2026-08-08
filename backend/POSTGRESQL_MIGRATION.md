# MongoDB to PostgreSQL Migration Guide

## Overview
This document outlines the migration from MongoDB (Mongoose) to PostgreSQL for the Travel & Tourism backend.

## Changes Made

### 1. Dependencies Updated
**Removed:**
- `mongoose` (MongoDB ODM)

**Added:**
- `pg` (PostgreSQL client)

Update packages with:
```bash
npm install
```

### 2. Database Configuration

#### Old MongoDB Setup (src/config/db.js)
- Used Mongoose to connect to MongoDB
- Required `MONGO_URI` environment variable

#### New PostgreSQL Setup
- **database.js**: Connection pool configuration
- **schema.js**: Automatic table creation on startup
- Requires PostgreSQL connection details:
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_HOST`
  - `DB_PORT`
  - `DB_NAME`

### 3. Environment Variables

Create a `.env` file based on `.env.example`:
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=travel_tourism
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 4. Database Setup

#### Prerequisites
- PostgreSQL installed and running
- Create a database: `CREATE DATABASE travel_tourism;`

#### Automatic Schema Creation
The schema is automatically created when the server starts (see `src/config/schema.js`).

Tables created:
- `users` - User accounts
- `places` - Travel destinations
- `place_images` - Images for places
- `place_activities` - Activities at places
- `ratings` - User ratings and reviews
- `bookings` - Booking records
- `contacts` - Contact messages
- `testimonials` - User testimonials

### 5. Model Changes

All models have been converted from Mongoose to SQL:

#### User Model
- Static methods replace instance methods
- Example: `User.findById(id)` instead of `user._id`
- Password hashing still uses bcryptjs

#### Place Model
- Related data (images, activities, ratings) stored in separate tables
- JOINs handled in model methods

#### Booking Model
- All fields properly typed in PostgreSQL
- camelCase mapped to snake_case in database

#### Contact & Testimonial Models
- Similar structure to Booking

### 6. Query Differences

#### Mongoose (Old)
```javascript
const user = await User.findOne({ email }).select('+password');
const places = await Place.find({ province, featured: true }).sort({ rating: -1 });
```

#### PostgreSQL (New)
```javascript
const user = await User.findOneWithPassword(email);
const places = await Place.find({ province, featured: true });
```

### 7. Running the Server

```bash
cd backend
npm install
npm start
```

The server will:
1. Connect to PostgreSQL
2. Create tables if they don't exist
3. Start listening on PORT (default: 5000)

### 8. API Endpoints (Unchanged)
All API endpoints remain the same. The frontend doesn't need changes.

### 9. Data Migration (If Needed)

To migrate existing MongoDB data:
1. Export MongoDB collections as JSON
2. Use a migration script to insert into PostgreSQL
3. Adjust ID references (MongoDB ObjectIds → PostgreSQL Integer IDs)

Example migration script can be created if needed.

### 10. Troubleshooting

**Error: "Database does not exist"**
```sql
CREATE DATABASE travel_tourism;
```

**Error: "User does not exist"**
```sql
CREATE USER postgres WITH PASSWORD 'your_password';
ALTER ROLE postgres SUPERUSER;
```

**Connection refused**
- Ensure PostgreSQL is running
- Check DB_HOST and DB_PORT in .env

**Port already in use**
- Change PORT in .env or kill process using port 5000

## API Testing

The API endpoints work exactly as before:

```bash
# Register
POST http://localhost:5000/api/auth/register

# Login
POST http://localhost:5000/api/auth/login

# Get all places
GET http://localhost:5000/api/places

# Get stats
GET http://localhost:5000/api/stats
```

## Performance Considerations

1. **Indexes**: Automatically created for frequently queried fields
2. **Connection Pool**: Configured for optimal performance (defaults: min 2, max 20)
3. **Query Optimization**: SQL queries use parameterized statements to prevent SQL injection

## Support

For issues or questions about the migration, refer to:
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Node.js pg library: https://node-postgres.com/
