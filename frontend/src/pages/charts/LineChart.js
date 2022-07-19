import React from "react";
import 'chart.js/auto'


import { Line } from "react-chartjs-2";

export const options = {
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
};
function LineChart() {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  

  return (<div style={{width: '50vw', height: '50vh'}}>
    <Line id="231" options={options} data={data} />
    </div>);
}

export default LineChart;
