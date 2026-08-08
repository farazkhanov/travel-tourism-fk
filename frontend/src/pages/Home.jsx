import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Sidebar from '../components/Sidebar';
import PlaceCard from '../components/PlaceCard';
import ContributionBadge from '../components/ContributionBadge';

export default function Home() {
  const { user } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    api.getPlaces({ sort: 'rating', limit: 6 })
      .then(res => setFeatured(res.data || []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-80"><Sidebar user={user} /></aside>
        <main className="flex-1">
          <div className="github-card mb-6">
            <h1 className="text-2xl font-bold">Discover Pakistan</h1>
            <p className="text-text-secondary mt-2">
              Explore the hidden gems of Pakistan – from majestic mountains to ancient civilizations.
            </p>
            {user && (
              <div className="mt-4">
                <ContributionBadge
                  bookingsCount={user.bookingsCount}
                  reviewsCount={user.reviewsCount}
                />
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mb-4">✨ Featured Destinations</h2>

          {loading && (
            <p className="text-text-secondary">Loading destinations...</p>
          )}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          {!loading && !error && featured.length === 0 && (
            <p className="text-text-secondary">No destinations found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featured.map(place => (
              <PlaceCard key={place._id} place={place} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
