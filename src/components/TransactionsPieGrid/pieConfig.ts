import type { ChartOptions } from "chart.js";

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: "#101828",
        font: {
          size: 14,
          weight: 400,
        },
        boxWidth: 16,
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw as number;
          return `$${value.toLocaleString()}`;
        },
      },
    },
  },
};

export default options;
