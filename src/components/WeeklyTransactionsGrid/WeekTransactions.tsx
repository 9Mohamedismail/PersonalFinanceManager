import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { useNavigate } from "react-router";
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

type WeekTransactionsGrid = {
  grid: boolean;
};

function WeekTransactionsGrid({ grid }: WeekTransactionsGrid) {
  const navigate = useNavigate();
  return (
    <div className="bg-secondary-100 rounded p-6 w-full text-start">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold text-gray-900 mb-2 ">
          Last Week Transactions
        </p>
        {grid && (
          <p
            className="text-secondary font-bold mb-2 align-center cursor-pointer"
            onClick={() => navigate("/metrics")}
          >
            View Details
          </p>
        )}
      </div>
      <div className="mt-4 w-full h-[210px] ">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default WeekTransactionsGrid;
