import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthed, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  console.log('ProtectedRoute - isAuthed:', isAuthed); // Debugging

  // Jika pengguna belum terautentikasi, arahkan ke /login
  if (!isAuthed) {
    return <Navigate to="/login" replace />;
  }

  // Jika pengguna terautentikasi, tampilkan halaman yang diminta
  return children;
}
