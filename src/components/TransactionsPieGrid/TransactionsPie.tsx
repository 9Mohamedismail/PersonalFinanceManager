import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { ArcElement, Tooltip, Legend } from "chart.js";
import options from "./pieConfig";
import data from "./pieData";

ChartJS.register(ArcElement, Tooltip, Legend);

function TransactionsPie() {
  return (
    <div className="bg-secondary-100 rounded p-6 lg:flex-1">
      <p className="text-lg font-semibold text-gray-900 mb-2">
        Weekly Spending by Category
      </p>
      <div className="mt-4 w-full h-[400px] min-w-0">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}

export default TransactionsPie;
