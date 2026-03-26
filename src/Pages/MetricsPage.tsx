import BudgetProgressBar from "../components/BudgetProgressBar/BudgetProgress";
import TransactionsPie from "../components/TransactionsPieChart/TransactionsPie";
import WeekTransactionsGrid from "../components/TransactionsLineChart/TransactionsLine";
import { FaAngleDoubleUp } from "react-icons/fa";

function MetricsPage() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid lg:grid-cols-3 lg:grid-rows-[auto,auto] gap-4">
        <div className="min-w-0 w-full">
          <TransactionsPie grid={false} />
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 gap-4 min-w-0">
          <div className="min-w-0 w-full">
            <WeekTransactionsGrid grid={false} />
          </div>

          <BudgetProgressBar grid={false} />
        </div>
      </div>
    </div>
  );
}
export default MetricsPage;
