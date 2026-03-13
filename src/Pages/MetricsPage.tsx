import BudgetProgressBar from "../components/BudgetProgressBar/BudgetProgress";
import TransactionsPie from "../components/TransactionsPieChart/TransactionsPie";
import WeekTransactionsGrid from "../components/TransactionsLineChart/TransactionsLine";
import { FaAngleDoubleUp } from "react-icons/fa";

function MetricsPage() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid lg:grid-cols-3 lg:grid-rows-[auto,auto] gap-4 ">
        <TransactionsPie grid={false} />

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <BudgetProgressBar number={70} total={100} grid={false} />

          <div className="bg-secondary-100 rounded p-4">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              Recurring Subscriptions
            </p>
          </div>

          <div className="bg-secondary-100 rounded p-4">
            <p className="text-2xl font-semibold text-gray-900 mb-2">
              Category Spotlight
            </p>

            <p className="text-lg font-semibold text-gray-900 flex text-center">
              🚗 Transportation:
              <span className="inline-flex items-center ml-1 gap-1 text-primary tracking-wide">
                <FaAngleDoubleUp /> 42% compared to last month
              </span>
            </p>
          </div>

          <div className="bg-secondary-100 rounded p-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Needs vs Wants
            </p>
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>Needs</span>
              <span>65% ($520)</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Wants</span>
              <span>35% ($280)</span>
            </div>
          </div>

          <div className="col-span-2">
            <WeekTransactionsGrid grid={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsPage;
