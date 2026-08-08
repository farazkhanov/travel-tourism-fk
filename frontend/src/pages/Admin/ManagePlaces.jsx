import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

export default function ManagePlaces() {
  const [places, setPlaces] = useState([]);
  useEffect(() => { load(); }, []);
  const load = () => api.getPlaces().then(res => setPlaces(res.data));
  const del = async (id) => { if (confirm('Delete?')) { await api.deletePlace(id); toast.success('Deleted'); load(); } };
  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold">Manage Places</h1><Link to="/admin/places/new" className="btn-primary">+ Add Place</Link></div>
      <div className="github-card overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-default"><th className="text-left py-2">Name</th><th className="text-left">Location</th><th className="text-left">Price</th><th className="text-left">Actions</th></tr></thead>
      <tbody>{places.map(p => <tr key={p.id} className="border-b border-border-default"><td className="py-2">{p.name}</td><td>{p.province}</td><td>${p.price}</td><td><Link to={`/admin/places/edit/${p.id}`} className="text-[#58a6ff] mr-3">Edit</Link><button onClick={() => del(p.id)} className="text-red-500">Delete</button></td></tr>)}</tbody></table></div>
    </div>
  );
}