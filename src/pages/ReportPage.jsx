import { useState } from 'react';
import FlexibleForm from '../components/reportpage/FlexibleForm';
import FlexibleTable from '../components/reportpage/FlexibleTable';
import { FaRegFrownOpen } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import api from '../utils/api/api';

export default function ReportPage() {
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState('');

  // Mutation untuk mengambil data berdasarkan input form
  const mutation = useMutation({
    mutationFn: (payload) => api.oprGetReport(payload), // Panggil API dengan payload
    onSuccess: (data) => {
      setTableData(data || []); // Update data ke tabel
    },
    onError: (error) => {
      console.error('Error fetching report data:', error);
    },
  });

  // Fungsi untuk menghandle pencarian dari FlexibleForm
  const handleOnSearch = (formData) => {
    // console.log('Form submitted with payload:', formData);
    setSelectedData(formData.data); // Simpan jenis data yang dipilih
    mutation.mutate(formData); // Kirim formData ke server melalui mutation
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      {/* FlexibleForm memanggil handleOnSearch saat pengguna mencari */}
      <FlexibleForm onSearch={handleOnSearch} />

      {/* Tampilkan loading, error, atau tabel data */}
      {mutation.isLoading ? (
        <div className="flex flex-col items-center h-full justify-center">
          <p>Loading...</p>
        </div>
      ) : mutation.isError ? (
        <div className="flex flex-col items-center h-full justify-center">
          <FaRegFrownOpen className="text-4xl mb-2" />
          <p>Failed to load data. Please try again later.</p>
        </div>
      ) : tableData.length > 0 ? (
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
