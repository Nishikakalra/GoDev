import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ai_instructor_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = ({ token, user: userData }) => {
    localStorage.setItem('ai_instructor_token', token);
    localStorage.setItem('ai_instructor_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('ai_instructor_token');
    localStorage.removeItem('ai_instructor_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
