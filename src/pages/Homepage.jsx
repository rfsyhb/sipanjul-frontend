import BestSellingCard from '../components/homepage/BestSellingCard';
import RecentTransaction from '../components/homepage/RecentTransaction';
import SalesCard from '../components/homepage/SalesCard';
import {
  dailySales,
  monthlySales,
  weeklySales,
} from '../utils/dummyData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Homepage() {
  const toastOptions = {
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    theme: 'colored',
  }
  
  const notify = (message) => {
    toast(message, toastOptions);
  }
  
  return (
    <div className="flex flex-col h-[88vh] p-4 max-h-screen gap-2 pr-4">
      <section className="flex flex-row gap-4">
        <SalesCard
          label="Hari"
          value={dailySales.currentValue}
          oldValue={dailySales.oldValue}
          percentage={dailySales.percentage}
          isNegative={dailySales.isNegative}
        />
        <SalesCard
          label="Minggu"
          value={weeklySales.currentValue}
          oldValue={weeklySales.oldValue}
          percentage={weeklySales.percentage}
          isNegative={weeklySales.isNegative}
        />
        <SalesCard
          label="Bulan"
          value={monthlySales.currentValue}
          oldValue={monthlySales.oldValue}
          percentage={monthlySales.percentage}
          isNegative={monthlySales.isNegative}
        />
      </section>
      <BestSellingCard notify={notify} />

      <RecentTransaction />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
