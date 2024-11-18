import { useState } from 'react';
import PropTypes from 'prop-types';

export default function FlexibleForm({ onSearch }) {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [selectedInfo, setSelectedInfo] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');

  // Handler untuk perubahan tiap dropdown
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const handleDataChange = (e) => {
    setSelectedData(e.target.value);
    setSelectedInfo(''); // Reset opsi berikutnya agar tidak konflik
    setSelectedDetail(''); // Reset opsi berikutnya agar tidak konflik
  };

  const handleInfoChange = (e) => {
    setSelectedInfo(e.target.value);
    setSelectedDetail(''); // Reset opsi berikutnya agar tidak konflik
  };

  const handleDetailChange = (e) => {
    setSelectedDetail(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const objectToSent = {
      period: selectedPeriod,
      division: selectedDivision,
      data: selectedData,
      ...(selectedData === 'detail' && {
        information: selectedInfo,
      }),
      ...(selectedInfo === 'perubahan' && {
        detail: selectedDetail,
      }),
    };

    // Gunakan fungsi dari parent untuk update state dengan data yang dikumpulkan
    onSearch(objectToSent);
  };

  return (
    <div className="flex flex-row justify-between">
      <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
        {/* Select 1: Pilih Harian/Mingguan/Bulanan/Tahunan */}
        <select
          name="period"
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Pilih Periode</option>
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          <option value="tahunan">Tahunan</option>
        </select>

        {/* Select 2: Semua Divisi/Supply Chain/Komersil */}
        <select
          name="division"
          value={selectedDivision}
          onChange={handleDivisionChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Pilih Divisi</option>
          <option value="semua">Semua Divisi</option>
          <option value="supply">Supply Chain dan Pelayanan Publik</option>
          <option value="komersil">Komersil</option>
        </select>

        {/* Select 3: Detail/Data Penjualan Perdagangan */}
        <select
          name="data"
          value={selectedData}
          onChange={handleDataChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Pilih Data</option>
          <option value="detail">Detail</option>
          <option value="penjualan">Data Penjualan Perdagangan</option>
        </select>

        {/* Select 4: Informasi Penjualan/Informasi Perubahan */}
        {selectedData === 'detail' && (
          <select
            name="information"
            value={selectedInfo}
            onChange={handleInfoChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Pilih Informasi</option>
            <option value="penjualan">Informasi Penjualan</option>
            <option value="perubahan">Informasi Perubahan</option>
          </select>
        )}

        {/* Select 5: Detail/Penambahan Stok/Pengurangan Stok */}
        {selectedInfo === 'perubahan' && (
          <select
            name="detail"
            value={selectedDetail}
            onChange={handleDetailChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Pilih Detail</option>
            <option value="detail">Semua Data</option>
            <option value="tambah_stok">Penambahan Stok</option>
            <option value="kurangi_stok">Pengurangan Stok</option>
          </select>
        )}

        {/* Tombol Search */}
        <button
          type="submit"
          className="p-2 bg-actionBtn border border-actionBtn hover:bg-activeBtn text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Tombol Cetak */}
      <button className="p-2 bg-actionBtn border border-actionBtn hover:bg-activeBtn text-white rounded">
        Cetak
      </button>
    </div>
  );
}

FlexibleForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
