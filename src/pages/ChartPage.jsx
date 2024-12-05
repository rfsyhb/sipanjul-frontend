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
import useIsMobile from '../hooks/useIsMobile';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartPage = () => {
  const isMobile = useIsMobile(768);
  // Function to generate chart data from dummy data
  const generateChartData = (periodData) => {
    return {
      labels: periodData.data.map((item) => item.name),
      datasets: [
        {
          label: `Total Penjualan (${periodData.period})`,
          data: periodData.data.map((item) => item.totalPenjualan),
          backgroundColor: ['#F0AB26', '#1B4F88'],
        },
      ],
    };
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-5 lg:h-[88vh] p-4 overflow-y-auto h-[92vh]">
      {chartData.map((data, index) => (
        <div
          key={index}
          className="mb-3 md:mb-0 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md"
          style={{ width: isMobile ? '99%' : '100%', height: isMobile ? '280px' : '400px' }} // Adjust height for better mobile experience
        >
          <Bar
            data={generateChartData(data)}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Important for flexibility
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    font: {
                      size: 12, // Adjust font size for smaller screens
                    },
                  },
                },
                title: {
                  display: true,
                  text: `PENJUALAN ${data.period.toUpperCase()}`,
                  font: {
                    size: 14, // Adjust title font size
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 10, // Adjust font size for better readability
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 10,
                    },
                  },
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
