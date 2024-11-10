import BestSellingCard from '../components/homepage/BestSellingCard';
import SalesCard from '../components/homepage/SalesCard';

export default function Homepage() {
  return (
    <div className="flex flex-col h-full max-h-screen gap-2 pr-4">
      <section className='flex flex-row gap-4'>
        <SalesCard label="Hari" value={924000} oldValue={800000} />
        <SalesCard label="Bulan" value={8928500} oldValue={10756000} />
        <SalesCard label="Tahun" value={162893000} oldValue={154765900} />
      </section>
      <BestSellingCard />
    </div>
  );
}
