import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import PaymentSimulation from '../components/PaymentSimulation';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Booking() {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [guests, setGuests] = useState(2);
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!user) { toast.error('Please login'); navigate('/login'); } else api.getPlaceById(placeId).then(res => setPlace(res.data)); }, [placeId, user, navigate]);
  if (!place) return <div className="container-custom py-8">Loading...</div>;
  const nights = Math.ceil((checkOut - checkIn) / (1000*60*60*24));
  const totalPrice = place.price * nights;
  const bookingDetails = { placeId, placeName: place.name, checkIn, checkOut, guests, totalPrice, nights };
  return (
    <div className="container-custom py-8 max-w-2xl mx-auto">
      <div className="github-card"><h2 className="text-2xl font-bold mb-4">Complete Booking</h2><h3 className="text-xl mb-4">{place.name}</h3>
        <div className="space-y-4"><div><label className="block text-sm">Check-in</label><DatePicker selected={checkIn} onChange={d => setCheckIn(d)} minDate={new Date()} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2" /></div>
        <div><label className="block text-sm">Check-out</label><DatePicker selected={checkOut} onChange={d => setCheckOut(d)} minDate={checkIn} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2" /></div>
        <div><label className="block text-sm">Guests</label><input type="number" min="1" value={guests} onChange={e => setGuests(parseInt(e.target.value))} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2" /></div>
        <div className="bg-bg-primary p-3 rounded-md"><p>${place.price} x {nights} nights = <strong>${totalPrice}</strong></p></div>
        <PaymentSimulation bookingDetails={bookingDetails} onComplete={() => { toast.success('Booking confirmed!'); navigate('/places'); }} /></div>
      </div>
    </div>
  );
}