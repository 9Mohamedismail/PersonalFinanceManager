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
import { TransactionsLineChartData } from "./chartData";
import { useState } from "react";

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

function TransactionsLine({ grid }: WeekTransactionsGrid) {
  const [dataRange, setDataRange] = useState<
    "all" | "week" | "lastWeek" | "month" | "lastMonth"
  >("week");

  const data = TransactionsLineChartData(dataRange);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDataRange(
      e.target.value as "all" | "week" | "lastWeek" | "month" | "lastMonth"
    );
  };

  const navigate = useNavigate();
  const values = (data.datasets?.[0]?.data as number[]) ?? [];
  const isEmpty = values.every((value) => value === 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 w-full text-start h-full flex flex-col">
      <div className="xl:flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2 ">
          {data.datasets?.[0]?.label}
        </p>
        {grid ? (
          <p
            className="text-primary mb-2 align-center cursor-pointer"
            onClick={() => navigate("/metrics")}
          >
            View Details
          </p>
        ) : (
          <>
            <select
              name="range"
              className="align-center appearance-none block bg-white rounded shadow-sm border border-primary p-2 leading-tight 
             focus:outline-none focus:bg-white focus:border-primary text-xs sm:text-base cursor-pointer"
              onChange={handleChange}
              value={dataRange}
            >
              <option disabled hidden value="">
                Choose a Date Range
              </option>
              <option value="all">All</option>
              <option value="week">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="month">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </>
        )}
      </div>

      <div className="mt-4 w-full h-[220px]">
        {isEmpty ? (
          <p className="text-2xl text-primary tracking-wide flex items-center justify-center h-full">
            No data available
          </p>
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
    </div>
  );
}

export default TransactionsLine;
