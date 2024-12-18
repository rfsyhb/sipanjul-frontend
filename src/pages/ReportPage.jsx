import { useState } from 'react';
import FlexibleForm from '../components/reportpage/FlexibleForm';
import FlexibleTable from '../components/reportpage/FlexibleTable';
import { salesReport, changedDataReport } from '../utils/dummyData';
import { FaRegFrownOpen } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api/api';

export default function ReportPage() {
  // State untuk menyimpan data form yang diambil dari FlexibleForm
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState('');
  const [payload, setPayload] = useState(null);

  const {
    data: reportData,
    isLoading: isReportDataLoading,
    isRefetching: isReportDataRefetching,
    isError: isReportDataError,
  } = useQuery({
    queryKey: ['reportData'],
    queryFn: () => api.getReportData(payload),
    enabled: !!payload, // hanya aktif jika payload tidak null
  });

  const handleOnSearch = (newPayload) => {
    console.log(newPayload);
    setPayload(newPayload);
    setTimeout(() => {
      setPayload(null);
    }, 2000);
  };

  // Fungsi untuk menerima data dari FlexibleForm dan memperbarui state tableData
  const handleFormSearch = (formData) => {
    console.log(formData);
    // Filter data dari salesReport berdasarkan input pengguna
    setSelectedData(formData.data);

    const selectedReportData =
      formData.data === 'perubahan' ? changedDataReport : salesReport;

    let filteredData =
      selectedReportData.find((report) => report.period === formData.period)
        ?.data || [];

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
      <FlexibleForm onSearch={handleOnSearch} />

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
