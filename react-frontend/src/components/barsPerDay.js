import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart(props) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Receivers Planted Per Day',
      },
    },
  };

  const allDates = props.datesCompleted;
  const labels = Object.keys(allDates);
  const labelsValues = Object.values(allDates);

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Receivers Planted',
        data: labelsValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return <Bar options={options} data={data} />;
}

export default BarChart;