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
    <div className="bg-secondary-100 rounded shadow p-6 lg:col-start-2 lg:row-start-1 w-full h-full text-start ">
      <p className="text-lg font-semibold text-gray-900">
        Last Week Transactions
      </p>
      <div className="w-full h-full mt-4">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default WeekTransactionsGrid;
