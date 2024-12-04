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
import { chartData } from '../utils/dummyData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = () => {
  // Function to generate chart data from dummy data
  const generateChartData = (periodData) => {
    return {
      labels: periodData.data.map((item) => item.name),
      datasets: [
        {
          label: `Total Penjualan (${periodData.period})`,
          data: periodData.data.map((item) => item.totalPenjualan),
          backgroundColor: [
            '#F0AB26',
            '#1B4F88',
          ],
        },
      ],
    };
  };

  return (
    <div className="grid grid-cols-2 gap-5 h-[88vh] p-5 overflow-x-auto">
      {chartData.map((data, index) => (
        <div key={index} className="p-5 bg-gray-100 rounded-lg shadow-md">
          <Bar
            data={generateChartData(data)}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `PENJUALAN ${data.period.toUpperCase()}`,
                  font: {
                    size: 16,
                  }
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ChartPage;
