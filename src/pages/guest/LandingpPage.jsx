import React from 'react';
import bulogImage from '../../assets/BULOG.jpeg';
import bulogLogo from '../../assets/bulogKalteng.png';
import mediumsphp from '../../assets/sphp_medium.png';
import setra from '../../assets/setraramos.png';
import Slyp from '../../assets/sylp_super.png';
import siam from '../../assets/siam_kahayan.png';
import Gula from '../../assets/gula.png';
import Minyak from '../../assets/minyak.png';
import rizki from '../../assets/minyakrizki.png';
import bawang from '../../assets/bawangputih.png';

function Card({ name, imageUrl, isOutOfStock }) {
  return (
    <div className="md:w-[339px] md:h-[310px] w-[200px] p-3 border-4 border-gray-300 rounded-lg shadow-md relative snap-center overflow-hidden flex-shrink-0">
      <img src={imageUrl} alt={name} className="w-full h-[150px] md:w-[350px] md:h-[240px] object-cover rounded-md mx-auto"/>
      <p className="font-bold text-center mt-3">{name}</p>
      {isOutOfStock && (
        <>
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-lg"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-center text-xs md:text-base lg:text-lg xl:text-xl p-1 px-2 lg:px-3 bg-red-500 bg-opacity-90 rounded-md whitespace-nowrap">
            BARANG SEDANG HABIS
          </div>
        </>
      )}
    </div>
  );
}

function CardSlider({ items }) {
  return (
    <div className="relative flex justify-center w-full">
      <div className="absolute inset-0 bg-gray-200 -mx-4 sm:-mx-10 p-2 sm:p-3 rounded-md"></div>
      <div className="relative flex overflow-x-scroll gap-4 py-2 snap-x snap-mandatory flex-nowrap scroll-smooth">
        {items.map((item, index) => (
          <Card key={index} {...item} />
        ))}
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


function App({ isStoreOpen }) {
  return (
    <div className="p-3 sm:p-10 font-sans bg-white text-black-900">
      <header className="flex items-center justify-between pb-5 border-b-2 border-gray-300">
        <img src={bulogLogo} alt="Bulog Kalteng" className="h-4 sm:h-6 md:h-8 mr-2"/>
        <div className="flex items-center gap-2">
          <span className="text-sm font-poppins text-black-600">Status Toko:</span>
          <span className={`px-3 py-1 rounded-full font-bold text-xs ${isStoreOpen ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            {isStoreOpen ? 'TOKO SEDANG BUKA' : 'TOKO TUTUP'}
          </span>
        </div>
      </header>

      <section className="sm:p-10 flex flex-col md:flex-row items-start gap-4 mt-5">
        <div className="text-left md:flex-1">
          <h2 className="text-xl md:text-4xl font-bold text-black font-poppins">Tim Pengendali Inflasi Daerah</h2>
          <h3 className="text-xl font-normal text-black font-poppins mt-3">(TPID) Palangka Raya</h3>
          <div className="w-full md:w-[50%] h-auto flex justify-center md:ml-auto mt-5 md:mt-0 mb-4">
            <img src={bulogImage} alt="TPID" className="w-full h-full max-w-[600px] max-h-[400px] rounded-lg object-cover" />
          </div>
          <p className="text-sm md:text-md lg:text-lg mt-4">
            *Jadwal buka: Senin - Kamis 7-12 dan 13-16, Jumat 7-11 dan 13-16, dan Sabtu 7-12
          </p>
        </div>
      </section>

      <div className="mt-6 sm:mt-8">
        <h3 className="mb-2 font-bold text-black text-sm md:text-xl">Beras</h3>
        <CardSlider items={riceProducts} />
      </div>
      <div className="mt-6 sm:mt-8">
        <h3 className="mb-2 font-bold text-black text-sm md:text-xl">Lainnya</h3>
        <CardSlider items={otherProducts} />
      </div>
    </div>
  );
}

export default App;
