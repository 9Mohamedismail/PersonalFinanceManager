import BudgetProgressBar from "../components/BudgetProgressBar/BudgetProgress";
import TransactionsPie from "../components/TransactionsPieChart/TransactionsPie";
import WeekTransactionsGrid from "../components/TransactionsLineChart/TransactionsLine";
import { FaAngleDoubleUp } from "react-icons/fa";

function MetricsPage() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid lg:grid-cols-3 lg:grid-rows-[auto,auto] gap-4 ">
        <TransactionsPie grid={false} />

        <div className="lg:col-span-2 grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <WeekTransactionsGrid grid={false} />
          </div>

          <BudgetProgressBar grid={false} />
        </div>
      </div>
    </div>
  );
}

export default MetricsPage;
