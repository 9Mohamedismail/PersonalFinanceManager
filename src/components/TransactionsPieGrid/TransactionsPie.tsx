import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router";
import options from "./pieConfig";
import { useWeeklyCategoryChartData, labels } from "./pieData";

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionsPieProps = {
  grid: boolean;
};

function TransactionsPie({ grid }: TransactionsPieProps) {
  const navigate = useNavigate();
  const data = useWeeklyCategoryChartData();
  const values = (data.datasets?.[0]?.data as number[]) ?? [];

  const isEmpty = values.every((value) => value === 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 lg:flex-1">
      <div className="xl:flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2">
          Previous Weekly Spending by Category
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
