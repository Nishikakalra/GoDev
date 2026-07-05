import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#1E406D] via-[#A395AC] to-[#FFDBD0]">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
