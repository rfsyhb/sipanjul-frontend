import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="font-poppins bg-bg text-text min-h-screen w-full transition-all duration-500 ease-in-out flex">
      <Routes>
        <Route path="/" element={<p>Homepage</p>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;