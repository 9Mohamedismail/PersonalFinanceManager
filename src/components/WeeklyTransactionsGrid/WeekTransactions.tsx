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
import { useWeeklyChartData } from "./chartData";

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
  const data = useWeeklyChartData();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 w-full text-start h-full flex flex-col">
      <div className="xl:flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2 ">
          Previous Week Transactions
        </p>
        {grid && (
          <p
            className="text-primary mb-2 align-center cursor-pointer"
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
