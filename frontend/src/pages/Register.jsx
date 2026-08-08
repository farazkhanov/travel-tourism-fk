import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.success) { toast.success('Account created'); navigate('/'); } else toast.error(res.error);
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="github-card w-full max-w-md"><h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
        <form onSubmit={handleSubmit}><div className="mb-4"><label className="block text-sm mb-1">Full Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2" required /></div>
        <div className="mb-4"><label className="block text-sm mb-1">Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2" required /></div>
        <div className="mb-6"><label className="block text-sm mb-1">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#0d1117] border border-[#30363d] rounded-md p-2" required /></div>
        <button type="submit" className="btn-primary w-full">Sign up</button></form>
        <p className="text-center text-sm mt-4">Already have an account? <Link to="/login" className="text-accent-blue">Sign in</Link></p>
      </div>
    </div>
  );
}