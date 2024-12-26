import { useState } from 'react';
import FlexibleForm from '../components/reportpage/FlexibleForm';
import FlexibleTable from '../components/reportpage/FlexibleTable';
import { FaRegFrownOpen } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import api from '../utils/api/api';

export default function ReportPage() {
  const [tableData, setTableData] = useState([]);
  const [selectedData, setSelectedData] = useState('');
  const [isTableCleared, setIsTableCleared] = useState(false); // Track if table is cleared
  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Mutation for fetching data based on form input
  const mutation = useMutation({
    mutationFn: (payload) => {
      setIsTableCleared(true); // Mark table as cleared
      setTableData([]); // Clear table data
      return api.oprGetReport(payload);
    }, // Call API with the payload
    onSuccess: (data) => {
      setIsTableCleared(false); // Fetch complete, reset state
      setTableData(data || []); // Update table with fetched data
    },
    onError: (error) => {
      setIsTableCleared(false); // Fetch failed, reset state
      console.error('Error fetching report data:', error);
    },
  });

  // Mutation for printing report
  const { mutate: printReport } = useMutation({
    mutationFn: (payload) => {
      setIsPrintLoading(true);
      return api.oprPrintReport(payload);
    },
    onSuccess: () => {
      setIsPrintLoading(false);
      console.log('Print success:');
    },
    onError: (error) => {
      setIsPrintLoading(false);
      console.error('Error printing report:', error);
    },
  });

  // Handle search from FlexibleForm
  const handleOnSearch = (formData) => {
    setSelectedData(formData.data); // Save selected data type
    setIsSearchLoading(true);
    mutation.mutate(formData, {
      onSuccess: () => {
        setIsSearchLoading(false);
      }
    }); // Send formData to the server via mutation
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full w-full">
      {/* FlexibleForm calls handleOnSearch when the user submits */}
      <FlexibleForm onSearch={handleOnSearch} isSearchLoading={isSearchLoading} printReport={printReport} isPrintLoading={isPrintLoading} />

      {/* Show loading, error, or table data */}
      {mutation.isLoading || isTableCleared ? (
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
