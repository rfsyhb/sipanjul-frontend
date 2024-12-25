import { useState } from 'react';
import PropTypes from 'prop-types';
import useIsMobile from '../../hooks/useIsMobile';

export default function FlexibleForm({ onSearch, printReport, isPrintLoading }) {
  const isMobile = useIsMobile(768);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedData, setSelectedData] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');

  // Handler for changes in each input field
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDivisionChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const handleDataChange = (e) => {
    setSelectedData(e.target.value);
    setSelectedDetail(''); // Reset next option to avoid conflicts
  };

  const handleDetailChange = (e) => {
    setSelectedDetail(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const objectToSent = {
      data: selectedData,
      startdate: startDate,
      enddate: endDate,
      divisi:
        selectedDivision === 'semua'
          ? ''
          : selectedData === 'perubahan'
            ? ''
            : selectedDivision,
      detail:
        selectedData === 'perubahan'
          ? selectedDetail === 'semua'
            ? ''
            : selectedDetail
          : '',
    };

    // Use function from parent to update state with collected data
    onSearch(objectToSent);
  };

  return (
    <div
      className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row'} justify-between`}
    >
      <form
        onSubmit={handleSearch}
        className={`flex ${isMobile ? 'flex-col gap-1' : 'flex-row gap-4'} flex-wrap`}
      >
        <div
          className={` items-center flex justify-between ${isMobile ? ' flex-row' : ' flex-row gap-4'}`}
        >
          {/* Start Date Selector */}
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="py-2 px-1 border rounded"
            required
          />

          <p>to</p>

          {/* End Date Selector */}
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="py-2 px-1 border rounded"
            required
          />
        </div>

        {/* Select Utama */}
        <div
          className={`flex flex-wrap ${isMobile ? 'gap-1' : 'gap-4'} items-center justify-between`}
        >
          {/* Select 1: Division */}
          <div className="flex-1 min-w-[60px]">
            <select
              name="division"
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="w-full max-w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Divisi</option>
              <option value="semua">Semua Divisi</option>
              <option value="SCPP">Supply Chain dan Pelayanan Publik</option>
              <option value="Komersil">Komersil</option>
            </select>
          </div>

          {/* Select 2: Data */}
          <div className="flex-1 min-w-[120px]">
            <select
              name="data"
              value={selectedData}
              onChange={handleDataChange}
              className="w-full max-w-full p-2 border rounded"
              required
            >
              <option value="">Pilih Data</option>
              <option value="perubahan">Data Perubahan</option>
              <option value="penjualan">Data Penjualan Perdagangan</option>
            </select>
          </div>

          {/* Select 3: Detail */}
          {selectedData === 'perubahan' && (
            <div className="flex-1 min-w-[120px]">
              <select
                name="detail"
                value={selectedDetail}
                onChange={handleDetailChange}
                className="w-full max-w-full p-2 border rounded"
                required
              >
                <option value="">Pilih Detail</option>
                <option value="semua">Semua Data</option>
                <option value="penambahan">Penambahan Stok</option>
                <option value="pengurangan">Pengurangan Stok</option>
              </select>
            </div>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="p-2 bg-actionBtn border border-actionBtn hover:bg-activeBtn text-white rounded"
          >
            Search
          </button>
        </div>
      </form>

      {/* Print Button */}
      <button
        className={`p-2 bg-actionBtn border border-actionBtn hover:bg-activeBtn text-white rounded ${isPrintLoading ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={() => printReport({ startdate: startDate, enddate: endDate })}
        disabled={isPrintLoading}
      >
        {isPrintLoading ? 'Loading...' : 'Cetak Laporan'}
      </button>
    </div>
  );
}

FlexibleForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  printReport: PropTypes.func.isRequired,
  isPrintLoading: PropTypes.bool.isRequired,
};
