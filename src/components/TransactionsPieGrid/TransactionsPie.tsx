import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { ArcElement, Tooltip, Legend } from "chart.js";
import options from "./pieConfig";
import data from "./pieData";

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionsPieProps = {
  grid: boolean;
};

function TransactionsPie({ grid }: TransactionsPieProps) {
  const labels = data.labels as string[];
  const values = data.datasets[0].data as number[];

  return (
    <div className="bg-secondary-100 rounded p-6 lg:flex-1">
      <p className="text-lg font-semibold text-gray-900 mb-2">
        Weekly Spending by Category
      </p>
      <div className="mt-4 w-full h-[400px] min-w-0">
        <Doughnut options={options} data={data} />
      </div>
      {!grid &&
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
