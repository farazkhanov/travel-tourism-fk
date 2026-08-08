import { useState, useEffect } from 'react';
import { api } from '../services/api';
import PlaceCard from '../components/PlaceCard';
import SearchFilter from '../components/SearchFilter';

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ province: 'all', category: 'all', maxPrice: '', search: '' });

  useEffect(() => { api.getPlaces().then(res => { setPlaces(res.data); setFiltered(res.data); }); }, []);
  useEffect(() => {
    let result = [...places];
    if (filters.province !== 'all') result = result.filter(p => p.province === filters.province);
    if (filters.category !== 'all') result = result.filter(p => p.category === filters.category);
    if (filters.maxPrice) result = result.filter(p => p.price <= parseInt(filters.maxPrice));
    if (filters.search) result = result.filter(p => p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.description.toLowerCase().includes(filters.search.toLowerCase()));
    setFiltered(result);
  }, [filters, places]);

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-6">All Destinations in Pakistan</h1>
      <SearchFilter filters={filters} setFilters={setFilters} />
      {filtered.length === 0 ? <p className="text-center text-text-secondary py-12">No places match your filters.</p> :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{filtered.map(place => <PlaceCard key={place.id} place={place} />)}</div>
      }
    </div>
  );
}