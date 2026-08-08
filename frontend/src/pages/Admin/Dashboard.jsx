import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ places: 0, bookings: 0 });
  useEffect(() => {
    api.getPlaces().then(res => setStats(prev => ({ ...prev, places: res.data.length })));
    api.getAllBookings().then(res => setStats(prev => ({ ...prev, bookings: res.data.length })));
  }, []);
  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="github-card"><h3 className="text-text-secondary">Total Places</h3><p className="text-3xl font-bold">{stats.places}</p></div>
        <div className="github-card"><h3 className="text-text-secondary">Total Bookings</h3><p className="text-3xl font-bold">{stats.bookings}</p></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/admin/places"><div className="github-card hover:bg-[#1f242e]"><h2 className="text-xl font-bold">Manage Places</h2><p className="text-sm text-text-secondary">Add, edit or remove destinations</p></div></Link>
        <Link to="/admin/bookings"><div className="github-card hover:bg-[#1f242e]"><h2 className="text-xl font-bold">Manage Bookings</h2><p className="text-sm text-text-secondary">View and update booking status</p></div></Link>
      </div>
    </div>
  );
}