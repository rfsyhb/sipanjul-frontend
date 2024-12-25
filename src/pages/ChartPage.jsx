import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useIsMobile from '../hooks/useIsMobile';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateChartOptions = (period) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { font: { size: 12 } } },
    title: {
      display: true,
      text: `PENJUALAN ${period.toUpperCase()}`,
      font: { size: 14 },
    },
  },
  scales: {
    x: { ticks: { font: { size: 10 } } },
    y: { ticks: { font: { size: 10 } } },
  },
});

const transformChartData = (periodData) => ({
  labels: periodData.data.map((item) => item.name),
  datasets: [
    {
      label: `Total Penjualan (${periodData.period})`,
      data: periodData.data.map((item) => item.totalPenjualan),
      backgroundColor: ['#F0AB26', '#1B4F88'],
    },
  ],
});

export default function ChartPage() {
  const isMobile = useIsMobile(768);
  const {
    data: chartData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['chartData'],
    queryFn: api.oprGetSalesStatistic,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    console.log('Error fetching data', error);
    return <p>Error fetching data</p>;
  };
  if (!Array.isArray(chartData)) return <p>Invalid data format</p>;

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-5 lg:h-[88vh] p-4 overflow-y-auto h-[92vh]">
      {chartData.map((data, index) => (
        <div
          key={index}
          className={`mb-3 md:mb-0 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md ${
            isMobile ? 'h-[280px]' : 'h-[400px]'
          } w-[99%] md:w-[100%]`}
        >
          <Bar
            data={transformChartData(data)}
            options={generateChartOptions(data.period)}
          />
        </div>
      ))}
    </div>
  );
}
