import { createContext, useContext, useEffect, useState } from 'react';
import { api, setAuthToken } from '../services/api';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
      api.get('/auth/profile').then(r => setUser(r.data)).catch(() => {});
    } else {
      localStorage.removeItem('token');
      setAuthToken(null);
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const r = await api.post('/auth/login', { email, password });
    setToken(r.data.token);
  };

  const register = async (name, email, password, role) => {
    const r = await api.post('/auth/register', { name, email, password, role });
    setToken(r.data.token);
  };

  const logout = () => setToken(null);

  return (
    <AuthCtx.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
