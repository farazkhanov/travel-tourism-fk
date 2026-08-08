import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) { toast.success('Logged in'); navigate('/'); } else toast.error(res.error);
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="github-card w-full max-w-md"><h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        <form onSubmit={handleSubmit}><div className="mb-4"><label className="block text-sm mb-1">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-bg-primary border border-border-default rounded-md p-2" required /></div>
        <div className="mb-6"><label className="block text-sm mb-1">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-bg-primary border border-border-default rounded-md p-2" required /></div>
        <button type="submit" className="btn-primary w-full">Sign in</button></form>
        <p className="text-center text-sm mt-4">Demo: admin@example.com / admin123<br />user@example.com / user123</p>
        <p className="text-center text-sm mt-2">No account? <Link to="/register" className="text-accent-blue">Sign up</Link></p>
      </div>
    </div>
  );
}