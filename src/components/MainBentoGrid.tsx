import BalanceGrid from "./BalanceGrid";
import BudgetProgressBar from "./BudgetProgressBarGrid/BudgetProgress";
import PreviousTransactionsGrid from "./PreviousTransactionsGrid";
import TransactionsPie from "./TransactionsPieGrid/TransactionsPie";
import WeekTransactionsGrid from "./WeeklyTransactionsGrid/WeekTransactions";

function MainBentoGrid() {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-8">
      <div className="grid lg:grid-cols-3 lg:grid-rows-[auto,auto] gap-4">
        <div className="flex flex-col lg:col-span-2 lg:flex-row items-start gap-4 min-w-0">
          <div className="lg:w-[300px] w-full shrink min-w-0">
            <BalanceGrid />
          </div>
          <div className="w-full lg:flex-1 shrink min-w-0">
            <WeekTransactionsGrid />
          </div>
        </div>
        <div className="bg-secondary-100 rounded p-6 lg:col-start-1 lg:row-start-2 lg:col-span-2 h-full min-w-0">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Previous Transactions
          </p>
          <div>
            <PreviousTransactionsGrid />
          </div>
        </div>

        <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 flex flex-col gap-4 min-w-0">
          <TransactionsPie grid />
          <div className="lg:h-[225px]">
            <BudgetProgressBar number={70} total={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBentoGrid;
