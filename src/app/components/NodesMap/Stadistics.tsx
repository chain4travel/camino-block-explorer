import React, { Fragment, useEffect } from 'react';
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
import flags from './flags.json';
import sortBy from 'lodash/sortBy';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Stadistics = ({ nodesPerCountry }: any) => {
  const options = {
    indexAxis: 'y' as const,
    color: '#64748B',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#64748B',
          callback: function (value: any, index: any, ticks: any) {
            return (
              getStringFlag(nodesPerCountry[index].country) +
              ' ' +
              nodesPerCountry[index].country
            );
          },
        },
      },
      x: {
        ticks: { color: '#64748B' },
      },
    },
  };

  const getStringFlag = (countryName: string) => {
    let flagUnicode = flags.find(
      fl => fl.name.toString() == countryName.toString(),
    );
    return flagUnicode?.emoji;
  };

  const labels = nodesPerCountry.map((item: any) => item.country);

  const data = {
    labels,
    datasets: [
      {
        label: 'Nodes',
        data: nodesPerCountry.map((item: any) => item.nodes.length),
        backgroundColor: '#41547C',
        borderColor: 'white',
      },
    ],
  };

  useEffect(() => {
    console.log('nodesPerCountry', nodesPerCountry);
  }, []);

  return (
    <Fragment>
      <Bar options={options} data={data} />
    </Fragment>
  );
};

export default Stadistics;
