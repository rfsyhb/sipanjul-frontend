import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Simulate login process (replace with actual login logic)
    alert(`Logging in as ${username}`);
    setError(''); // Reset error after successful login simulation
  };

  return (
    <div className="w-full h-screen bg-text flex flex-row ">
      {/* sisi kiri */}
      <div className="bg-white flex flex-col items-center justify-center shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
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
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
      {/* sisi kanan */}
      <div className="flex-1 h-screen items-center flex justify-center">
        <div className="bg-bg text-center p-2">
          <h1 className="text-white text-3xl font-medium">
            Sistem Pintar Penjualan
          </h1>
        </div>
      </div>
    </div>
  );
}
