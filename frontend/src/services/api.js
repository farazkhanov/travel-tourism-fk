const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Generic fetch wrapper
const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const api = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  register: (name, email, password) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  login: (email, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  getMe: () => request('/auth/me'),

  // ── Places ────────────────────────────────────────────────────────────────
  getPlaces: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/places${qs ? '?' + qs : ''}`);
  },

  getPlaceById: (id) => request(`/places/${id}`),

  createPlace: (data) =>
    request('/places', { method: 'POST', body: JSON.stringify(data) }),

  updatePlace: (id, data) =>
    request(`/places/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deletePlace: (id) =>
    request(`/places/${id}`, { method: 'DELETE' }),

  // ── Ratings ───────────────────────────────────────────────────────────────
  addRating: (placeId, rating, review) =>
    request(`/places/${placeId}/ratings`, {
      method: 'POST',
      body: JSON.stringify({ rating, review })
    }),

  getRatings: (placeId) => request(`/places/${placeId}/ratings`),

  // ── Bookings ──────────────────────────────────────────────────────────────
  createBooking: (booking) =>
    request('/bookings', { method: 'POST', body: JSON.stringify(booking) }),

  getMyBookings: () => request('/bookings/my'),

  getAllBookings: () => request('/bookings'),

  updateBookingStatus: (id, status) =>
    request(`/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  deleteBooking: (id) =>
    request(`/bookings/${id}`, { method: 'DELETE' }),

  // ── Contact ───────────────────────────────────────────────────────────────
  sendContact: (data) =>
    request('/contact', { method: 'POST', body: JSON.stringify(data) }),

  getContactMessages: () => request('/contact'),

  // ── Chat ──────────────────────────────────────────────────────────────────
  sendChatMessage: (message) =>
    request('/chat', { method: 'POST', body: JSON.stringify({ message }) }),

  // ── Stats & Testimonials ──────────────────────────────────────────────────
  getStats: () => request('/stats'),

  getTestimonials: () => request('/testimonials'),

  createTestimonial: (data) =>
    request('/testimonials', { method: 'POST', body: JSON.stringify(data) })
};
