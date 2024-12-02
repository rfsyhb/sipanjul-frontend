import { useState } from 'react';
import FlexibleForm from '../components/reportpage/FlexibleForm';
import FlexibleTable from '../components/reportpage/FlexibleTable';
import { salesReport, changedDataReport } from '../utils/dummyData';
import { FaRegFrownOpen } from 'react-icons/fa';

export default function ReportPage() {
  // State untuk menyimpan data form yang diambil dari FlexibleForm
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState('');

  // Fungsi untuk menerima data dari FlexibleForm dan memperbarui state tableData
  const handleFormSearch = (formData) => {
    console.log(formData)
    // Filter data dari salesReport berdasarkan input pengguna
    setSelectedData(formData.data);

    const selectedReportData = formData.data === 'perubahan' ? changedDataReport : salesReport;
    
    let filteredData =
      selectedReportData.find((report) => report.period === formData.period)?.data ||
      [];

    // Filter berdasarkan divisi jika divisi yang dipilih adalah 'komersil'
    if (formData.division === 'komersil') {
      filteredData = filteredData.filter((item) => item.divisi === 'Komersil');
    }

    if (formData.division === 'supply') {
      filteredData = filteredData.filter(
        (item) => item.divisi === 'Supply Chain dan Pelayanan Publik'
      );
    }

    setTableData(filteredData); // Update tableData dengan data yang sesuai
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      {/* FlexibleForm akan memanggil handleFormSearch ketika pengguna menekan tombol "Search" */}
      <FlexibleForm onSearch={handleFormSearch} />

      {/* Jika ada data di tableData, tampilkan FlexibleTable */}
      {tableData.length > 0 ? (
        <FlexibleTable data={tableData} selectedData={selectedData} />
      ) : (
        <div className="flex flex-col items-center h-full justify-center">
          <FaRegFrownOpen className="text-4xl mb-2" />
          <p>No data available!</p>
        </div>
      )}
    </div>
  );
}
