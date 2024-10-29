import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

function App() {
  return (
    <div className="font-poppins bg-bg text-text min-h-screen w-full transition-all duration-500 ease-in-out flex flex-col">
      <Header />
      <div className='bg-green-700 flex flex-row'>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
