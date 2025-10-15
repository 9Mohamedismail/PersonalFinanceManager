import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router";
import options from "./pieConfig";
import { TransactionsPieChartData, labels } from "./pieData";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionsPieProps = {
  grid: boolean;
};

function TransactionsPie({ grid }: TransactionsPieProps) {
  const [dataRange, setDataRange] = useState<
    "all" | "week" | "lastWeek" | "month" | "lastMonth"
  >("week");

  const data = TransactionsPieChartData(dataRange);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDataRange(
      e.target.value as "all" | "week" | "lastWeek" | "month" | "lastMonth"
    );
  };

  const navigate = useNavigate();
  const values = (data.datasets?.[0]?.data as number[]) ?? [];
  const isEmpty = values.every((value) => value === 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 lg:flex-1">
      <div className="xl:flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2">
          {data.datasets?.[0]?.label}
        </p>
        {grid ? (
          <p
            className="text-primary align-center cursor-pointer"
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

      <div className="mt-4 w-full h-[400px] min-w-0 flex items-center justify-center">
        {isEmpty ? (
          <p className="text-2xl text-primary tracking-wide">
            No data available
          </p>
        ) : (
          <Doughnut options={options} data={data} />
        )}
      </div>

      {!grid &&
        !isEmpty &&
        labels.map((label, i) => (
          <p
            key={label}
            className="text-lg font-semibold text-gray-900 mb-2 flex gap-x-2 "
          >
            {label}:
            <p className="text-lg font-semibold text-gray-900 tracking-wide">
              ${values[i]}
            </p>
          </p>
        ))}
    </div>
  );
}

export default TransactionsPie;
