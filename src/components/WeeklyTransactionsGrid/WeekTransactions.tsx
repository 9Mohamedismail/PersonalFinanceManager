import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import options from "./chartConfig";
import data from "./chartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeekTransactionsGrid() {
  return (
    <div className="bg-secondary-100 rounded p-6 w-full text-start">
      <p className="text-lg font-semibold text-gray-900 mb-2">
        Last Week Transactions
      </p>
      <div className="mt-4 w-full h-[210px] ">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default WeekTransactionsGrid;
