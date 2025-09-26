import type { ChartOptions } from "chart.js";

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (context) {
          const value = context.raw as number;
          return `$${value.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#16423c",
        font: {
          size: 14,
          weight: 400,
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      min: 0,
      ticks: {
        color: "#16423c",
        font: {
          size: 14,
          weight: 400,
        },
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 5,
      hoverRadius: 7,
    },
  },
};

export default options;
