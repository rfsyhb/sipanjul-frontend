import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api/api';
import { useAuth } from '../utils/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Tambahkan state loading
  const { setIsAuthed } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const data = await api.login({ name: username, password });
      api.putAccessToken(data.token); // Simpan token ke localStorage
      api.putUserId(data.id); // Simpan id pengguna ke localStorage
      setIsAuthed(true); // Set isAuthed menjadi true
      setError('');
      alert(`Login success. Welcome, ${username}!`);
      navigate('/home'); // Arahkan pengguna ke halaman utama
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // Nonaktifkan loading
    }
  };

  return (
    <div className="w-full h-screen bg-text flex flex-col lg:flex-row">
      {/* sisi kiri */}
      <div className="order-2 lg:order-1 bg-white flex flex-col items-center justify-center shadow-lg rounded-lg p-8 w-full max-w-md lg:mx-4 mb-[25vh] lg:mb-0">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign In</h2>
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        <form className="flex flex-col w-full" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border-2 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border-2 rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading} // Nonaktifkan tombol saat loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      {/* sisi kanan */}
      <div className="flex-1 order-1 lg:order-2 h-screen items-center flex justify-center">
        <div className="bg-inactiveBtn text-center p-2 rounded-md">
          <h1 className="text-white text-xl lg:text-3xl font-medium">
            Sistem Pintar Penjualan
          </h1>
        </div>
      </div>
    </div>
  );
}
