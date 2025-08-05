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
      label: "Weekly Spending by Category",
      data: [180, 140, 25, 35, 60],
      backgroundColor: [
        "#FF6384", // Restaurants - red
        "#36A2EB", // Supermarkets - blue
        "#FFCE56", // Transportation - yellow
        "#4BC0C0", // Gasoline - teal
        "#9966FF", // Merchandise - purple
      ],
      hoverOffset: 6,
    },
  ],
};

export default data;
