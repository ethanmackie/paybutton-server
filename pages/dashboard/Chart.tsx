import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart ({data, usd}): React.ReactElement {
    
    const options = {
        responsive: true,
        lineTension: 0.4,
        plugins: {
            legend: {
            display: false,
            },
            tooltip : {
            displayColors: false,
            // callbacks: {
            //     label: function(value) { 
            //         return value + ' €';
            //     }
            // }
            },
        },
        scales: {
            x: {
            grid: {
                display: false,
                drawBorder: true,
                drawOnChartArea: true,
                drawTicks: true,
            },
            ticks: {
                color: '#231f20',
            },
            },
            y: {
            grid: {
                drawBorder: false,
                color: '#231f201f',
            },
            grace: '10%',
            ticks: {
                color: '#231f20',
                callback: function(value) {
                return usd ? '$'+ value: value;
            }
            },
            position: 'right',
            },
        },
        };

  return <Line options={options} data={data} />
}
