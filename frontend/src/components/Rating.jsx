import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export default function Rating({ placeId, onRatingSubmitted }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) { toast.error('Please login to rate'); return; }
    if (rating === 0) { toast.error('Select a rating'); return; }
    setSubmitting(true);
    try {
      await api.addRating(placeId, rating, review, user.id);
      toast.success('Thank you for rating!');
      setRating(0); setReview('');
      onRatingSubmitted?.();
    } catch (err) { toast.error('Failed to submit'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="github-card mt-4">
      <h3 className="font-semibold mb-3">Rate this place</h3>
      <div className="flex space-x-1 mb-3">
        {[1,2,3,4,5].map(star => (
          <button key={star} className="text-2xl focus:outline-none" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>
            <span className={star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-500'}>★</span>
          </button>
        ))}
      </div>
      <textarea rows="2" value={review} onChange={e => setReview(e.target.value)} placeholder="Write a review (optional)" className="w-full bg-bg-primary border border-[#30363d] rounded-md p-2 text-sm mb-3" />
      <button onClick={handleSubmit} disabled={submitting} className="btn-primary w-full">{submitting ? 'Submitting...' : 'Submit Rating'}</button>
    </div>
  );
}