import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function PaymentSimulation({ bookingDetails, onComplete }) {
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setProcessing(true);
    setTimeout(async () => {
      try {
        await api.createBooking({ ...bookingDetails, userId: user.id, paymentStatus: 'simulated', status: 'confirmed' });
        toast.success('Booking confirmed! (Simulated payment)');
        onComplete?.();
        navigate('/places');
      } catch (err) { toast.error('Booking failed'); }
      finally { setProcessing(false); }
    }, 1500);
  };

  return (
    <div className="github-card">
      <h2 className="text-xl font-bold mb-4">Payment Simulation</h2>
      <div className="space-y-3">
        <div><label className="block text-sm">Card Number</label><input type="text" value="4242 4242 4242 4242" readOnly className="w-full bg-[#0d1117] border border-border-default rounded-md p-2 text-sm" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-sm">Expiry</label><input type="text" value="12/25" readOnly className="w-full bg-[#0d1117] border border-border-default rounded-md p-2 text-sm" /></div>
          <div><label className="block text-sm">CVC</label><input type="text" value="123" readOnly className="w-full bg-[#0d1117] border border-border-default rounded-md p-2 text-sm" /></div>
        </div>
        <div className="border-t border-border-default pt-3 mt-3"><div className="flex justify-between font-bold"><span>Total:</span><span>${bookingDetails.totalPrice}</span></div><p className="text-xs text-green-500 mt-1">⚡ Simulation – no real charge</p></div>
        <button onClick={handlePayment} disabled={processing} className="btn-primary w-full">{processing ? 'Processing...' : 'Confirm Booking'}</button>
      </div>
    </div>
  );
}