import { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode]     = useState('login');

  // On mount: restore session from localStorage token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getMe()
        .then(res => setUser(res.user))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('pakistanTravelUser');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const switchAuthMode = () => setAuthModalMode(p => p === 'login' ? 'register' : 'login');

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('pakistanTravelUser', JSON.stringify(res.user));
      setUser(res.user);
      toast.success(`Welcome back, ${res.user.name}!`);
      closeAuthModal();
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Login failed');
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.register(name, email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('pakistanTravelUser', JSON.stringify(res.user));
      setUser(res.user);
      toast.success('Account created successfully!');
      closeAuthModal();
      return { success: true };
    } catch (err) {
      toast.error(err.message || 'Registration failed');
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('pakistanTravelUser');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user,
      login,
      register,
      logout,
      loading,
      isAuthModalOpen,
      authModalMode,
      openAuthModal,
      closeAuthModal,
      switchAuthMode,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin', }}>
      {children}
    </AuthContext.Provider>
  );
};
