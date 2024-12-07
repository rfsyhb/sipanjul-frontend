import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Menambahkan isLoading

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('Token dari localStorage:', token); // Log token

    if (token) {
      try {
        // Anda bisa menambahkan validasi token di sini jika diperlukan
        setIsAuthed(true);
      } catch (error) {
        console.error('Error validating token:', error);
        setIsAuthed(false);
      }
    }

    setIsLoading(false); // Selesai memproses
  }, []);

  useEffect(() => {
    console.log('Status isAuthed:', isAuthed); // Log isAuthed setiap kali berubah
  }, [isAuthed]);

  return (
    <AuthContext.Provider value={{ isAuthed, isLoading, setIsAuthed }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}