import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => { load(); }, []);
  const load = () => api.getAllBookings().then(res => setBookings(res.data));
  const updateStatus = async (id, status) => { await api.updateBookingStatus(id, status); toast.success(`Booking ${status}`); load(); };
  return (
    <div className="container-custom py-8"><h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <div className="github-card overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-default"><th>Place</th><th>User</th><th>Check-in</th><th>Check-out</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>{bookings.map(b => <tr key={b.id} className="border-b border-border-default"><td className="py-2">{b.placeName}</td><td>User {b.userId}</td><td>{new Date(b.checkIn).toLocaleDateString()}</td><td>{new Date(b.checkOut).toLocaleDateString()}</td><td>${b.totalPrice}</td><td><span className={`px-2 py-1 rounded-full text-xs ${b.status === 'confirmed' ? 'bg-green-800' : 'bg-red-800'}`}>{b.status}</span></td>
      <td>{b.status !== 'confirmed' && <button onClick={() => updateStatus(b.id, 'confirmed')} className="text-green-500 mr-2">Confirm</button>}{b.status !== 'cancelled' && <button onClick={() => updateStatus(b.id, 'cancelled')} className="text-red-500">Cancel</button>}</td></tr>)}</tbody></table></div>
    </div>
  );
}