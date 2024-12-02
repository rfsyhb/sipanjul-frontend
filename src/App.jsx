import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import CashierPage from './pages/CashierPage';
import InventoryPage from './pages/InventoryPage';
import ReportPage from './pages/ReportPage';
import ChartPage from './pages/ChartPage';
import CalculatorPage from './pages/CalculatorPage';
import useIsMobile from './hooks/useIsMobile';
import { ToastContainer } from 'react-toastify';

function App() {
  const isMobile = useIsMobile(768);
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      {location.pathname === '/' ? (
        <p>Landing Page</p>
      ) : (
        <div className="overflow-hidden font-poppins bg-text text-bg min-h-screen w-full transition-all duration-500 ease-in-out flex flex-col h-screen">
          {isMobile ? (
            <div className="flex flex-row items-center p-1 pt-2 w-full fixed top-0 z-49 bg-text">
              <Header />
              <Sidebar currentPath={location.pathname} />
            </div>
          ) : (
            <Header />
          )}
          <div className={`flex flex-1 ${isMobile ? 'pt-8' : ''}`}>
            {!isMobile && <Sidebar currentPath={location.pathname} />}
            <div className="flex-1 flex flex-col py-2">
              <Routes>
                <Route path="/home" element={<Homepage />} />
                <Route path="/kasir" element={<CashierPage />} />
                <Route path="/stok" element={<InventoryPage />} />
                <Route path="/laporan" element={<ReportPage />} />
                <Route path="/grafik" element={<ChartPage />} />
                <Route path="/gpm" element={<CalculatorPage />} />
                <Route path="/test" element={<h1>test</h1>} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
