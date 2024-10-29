import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

function App() {
  const location = useLocation();
  
  return (
    <div className="font-poppins bg-text text-bg min-h-screen w-full transition-all duration-500 ease-in-out flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentPath={location.pathname} />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/kasir" element={<h1>Kasir</h1>} />
            <Route path="/stok" element={<h1>Stok</h1>} />
            <Route path="/laporan" element={<h1>Laporan</h1>} />
            <Route path="/grafik" element={<h1>Grafik</h1>} />
            <Route path="/gpm" element={<h1>Kalkulator GPM</h1>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
