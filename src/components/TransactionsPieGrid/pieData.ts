import type { ChartData } from "chart.js";

const labels: string[] = [
  "Restaurants",
  "Supermarkets",
  "Transportation",
  "Gasoline",
  "Merchandise",
];

const data: ChartData<"doughnut"> = {
  labels,
  datasets: [
    {
      label: "Spent this week:",
      data: [180, 140, 25, 35, 60],
      backgroundColor: ["#e06666", "#4d8370", "#4f81bd", "#d6a354", "#8e7cc3"],
      hoverOffset: 6,
    },
  ],
};

export default data;
