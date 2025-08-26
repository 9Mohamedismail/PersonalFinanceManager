import type { ChartData } from "chart.js";

const labels: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "",
      data: [43.21, 35.99, 52.45, 48.33, 62.18, 77.5, 25.6],
      borderColor: "#4d8370",
      borderWidth: 3,
      pointBackgroundColor: "#16423c",
      pointBorderWidth: 0,
      backgroundColor: "#f9fafb",
      fill: false,
      tension: 0,
    },
  ],
};

export default data;
