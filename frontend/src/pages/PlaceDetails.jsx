import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Rating from '../components/Rating';
import toast from 'react-hot-toast';

export default function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { api.getPlaceById(id).then(res => setPlace(res.data)); }, [id]);
  if (!place) return <div className="container-custom py-8">Loading...</div>;

  const bookNow = () => { if (!user) { toast.error('Please login'); navigate('/login'); } else navigate(`/booking/${id}`); };

  return (
    <div className="container-custom py-8">
      <div className="github-card">
        <img src={place.images[0]} alt={place.name} className="w-full h-80 object-cover rounded-md mb-4" />
        <h1 className="text-3xl font-bold">{place.name}</h1>
        <p className="text-text-secondary mt-1">{place.province} • {place.category}</p>
        <p className="mt-4">{place.description}</p>
        <div className="mt-4 flex gap-4 text-sm"><span className="font-semibold">Best time:</span> {place.bestTimeToVisit}</div>
        <div className="mt-4 flex gap-4 text-sm"><span className="font-semibold">Activities:</span> {place.activities.join(', ')}</div>
        <div className="mt-6 flex justify-between items-center"><span className="text-2xl font-bold text-[#2ea043]">${place.price} {place.price > 0 ? '/night' : '(Free)'}</span><button onClick={bookNow} className="btn-primary">Book Now</button></div>
        {user && <Rating placeId={id} onRatingSubmitted={() => api.getPlaceById(id).then(res => setPlace(res.data))} />}
      </div>
    </div>
  );
}