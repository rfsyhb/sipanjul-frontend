import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import CashierPage from './pages/CashierPage';
import InventoryPage from './pages/InventoryPage';
import LandingPage from './pages/guest/LandingPage';
import ReportPage from './pages/ReportPage';
import ChartPage from './pages/ChartPage';
import CalculatorPage from './pages/CalculatorPage';
import useIsMobile from './hooks/useIsMobile';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  const isMobile = useIsMobile(768);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isLandingPage = location.pathname === '/';

  return (
    <>
      <ToastContainer />
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : isLandingPage ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      ) : (
        <div className="overflow-hidden font-poppins bg-text text-bg w-full transition-all duration-500 ease-in-out flex flex-col h-screen">
          {isMobile ? (
            <div className="flex flex-row items-center p-1 pt-2 w-full fixed top-0 z-50 bg-text">
              <Header />
              <Sidebar currentPath={location.pathname} />
            </div>
          ) : (
            <div className="flex flex-shrink-0">
              <Header />
            </div>
          )}
          <div className={`flex flex-1 flex-grow ${isMobile ? 'pt-8' : ''} overflow-hidden`}>
            {!isMobile && <Sidebar currentPath={location.pathname} />}
            <div className={`flex-1 flex flex-col overflow-hidden ${isMobile ? 'py-2' : ''}`}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Homepage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/kasir"
                  element={
                    <ProtectedRoute>
                      <CashierPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stok"
                  element={
                    <ProtectedRoute>
                      <InventoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/laporan"
                  element={
                    <ProtectedRoute>
                      <ReportPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/grafik"
                  element={
                    <ProtectedRoute>
                      <ChartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gpm"
                  element={
                    <ProtectedRoute>
                      <CalculatorPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <ProtectedRoute>
                      <h1>Not Found</h1>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
