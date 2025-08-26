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
