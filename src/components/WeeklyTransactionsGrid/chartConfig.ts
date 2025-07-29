import type { ChartOptions } from "chart.js";

const options: ChartOptions<"line"> = {
  responsive: true,
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
        color: "#6b7280",
        font: {
          size: 14,
          weight: 500,
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
        color: "#6b7280",
        font: {
          size: 14,
          weight: 500,
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
