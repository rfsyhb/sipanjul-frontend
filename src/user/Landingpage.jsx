import React, { useRef } from 'react';
import bulogImage from '../assets/BULOG.jpeg';
import bulogLogo from '../assets/bulog Kalteng.png';
import mediumsphp from '../assets/sphp_medium.png';
import setra from '../assets/setraramos.png';
import Slyp from '../assets/sylp_super.png';
import siam from '../assets/siam_kahayan.png';
import Gula from '../assets/gula.png';
import Minyak from '../assets/minyak.png';
import rizki from '../assets/minyak rizki.png';
import bawang from '../assets/bawang putih.png';

function Card({ name, imageUrl, isOutOfStock }) {
  return (
<div className="md:w-[400px] md:h-[330px] sm:w-[339px] sm:h-[310px] left-6 p-3 border-4 border-gray-300 rounded-lg shadow-md relative snap-center overflow-hidden">
<img src={imageUrl} alt={name} className="w-[350px] h-[240px] sm:w-[310px] sm:h-[188px]object-cover rounded-md mx-auto"/>
      <p className="font-bold font-poppins text-md mt-5">{name}</p>
      {isOutOfStock && (
        <>
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-lg"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold font-poppins text-xl p-1 px-3 bg-red-500 bg-opacity-90 rounded-md whitespace-nowrap">
            BARANG SEDANG HABIS
          </div>
        </>
      )}
    </div>
  );
}

function CardSlider({ items }) {
  const sliderRef = useRef(null);
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        scrollNext();
      } else {
        scrollPrev();
      }
    }
  };

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="bg-gray-200 p-3 relative rounded-md w-screen left-1/2 -translate-x-1/2">
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll gap-2 py-2 snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-nowrap space-x-6">
          {items.map((item, index) => (
            <Card key={index} name={item.name} imageUrl={item.imageUrl} isOutOfStock={item.isOutOfStock}/>
          ))}
        </div>
      </div>
    </div>
  );
  
  
}

const riceProducts = [
  { name: 'Beras Medium SPHP', imageUrl: mediumsphp, isOutOfStock: false },
  { name: 'Beras Premium Setra Ramos', imageUrl: setra, isOutOfStock: true },
  { name: 'Beras Premium Slyp Super', imageUrl: Slyp, isOutOfStock: true },
  { name: 'Beras Siam Kahayan', imageUrl: siam, isOutOfStock: false },
  { name: 'Beras Premium SPHP', imageUrl: mediumsphp, isOutOfStock: false },
];

const otherProducts = [
  { name: 'Gula Manis Kita', imageUrl: Gula, isOutOfStock: true },
  { name: 'Minyak Goreng Kita', imageUrl: Minyak, isOutOfStock: false },
  { name: 'Minyak Rizki', imageUrl: rizki, isOutOfStock: false },
  { name: 'Bawang Putih', imageUrl: bawang, isOutOfStock: false },
  { name: 'Bawang Merah', imageUrl: bawang, isOutOfStock: false },
];

function App() {
  return (
    <div className=" sm:p-10 font-sans bg-white text-black-900">
      <header className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b-2 border-gray-300">
        <img src={bulogLogo} alt="Bulog Kalteng" className="w-44 md:w-64 h-auto"/>
        <div className="flex items-center gap-5">
          <span className="font-poppins text-base md:text-xl text-black-600"> status toko: </span>
          <span className="bg-green-600 text-white font-poppins font-bold px-4 sm:px-5 py-2 rounded-full text-md md:text-lg"> TOKO SEDANG BUKA </span>
        </div>
      </header>
      <section className="sm:p-10 flex flex-col md:flex-row items-start gap-4 mt-5">
        <div className="text-left md:flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-poppins">Tim Pengendali Inflasi Daerah</h2>
          <h3 className="text-3xl font-normal text-black font-poppins mt-3">(TPID) Palangka Raya</h3>
          <div className="w-full md:w-[50%] h-auto flex justify-center md:ml-auto mt-5 md:mt-0 mb-4 md:mb-0">
            <img src={bulogImage} alt="TPID" className="w-full h-full max-w-[700px] max-h-[450px] rounded-lg object-cover" />
          </div>
          <p className="text-md md:text-md text-black-500 mt-4 md:-mt-5 font-poppins">
            *Jadwal buka: Senin - Kamis 7-12 dan 13-16, Jumat 7-11 dan 13-16, dan Sabtu 7-12
          </p>
        </div>
      </section>


      <div className="mt-8">
        <h3 className="mb-2 font-bold text-black text-2xl">Beras</h3>
        <CardSlider items={riceProducts} />
      </div>
      <div className="mt-8">
        <h3 className="mb-2 font-bold text-black text-2xl">Lainnya</h3>
        <CardSlider items={otherProducts} />
      </div>
    </div>
  );
}

export default App;
