import BalanceGrid from "./BalanceGrid";
import BudgetProgressBar from "./BudgetProgressBarGrid/BudgetProgress";
import Transactions from "./TransactionsTable/Transactions";
import TransactionsPie from "./TransactionsPieGrid/TransactionsPie";
import WeekTransactionsGrid from "./WeeklyTransactionsGrid/WeekTransactions";

function MainBentoGrid() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid lg:grid-cols-3 lg:grid-rows-[auto,auto] gap-4">
        <div className="flex flex-col lg:col-span-2 lg:flex-row items-stretch gap-4 min-w-0">
          <div className="lg:w-[300px] w-full shrink min-w-0 h-full">
            <BalanceGrid />
          </div>
          <div className="w-full lg:flex-1 shrink min-w-0 h-full">
            <WeekTransactionsGrid grid />
          </div>
        </div>
        {/*<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-start-1 lg:row-start-2 lg:col-span-2 h-full min-w-0 justify-between">
          <Transactions grid />
        </div>*/}

        <div className="lg:col-start-3 lg:row-start-1 lg:row-span-2 flex flex-col gap-4 min-w-0">
          <TransactionsPie grid />
          <div className="lg:h-[225px]">
            <BudgetProgressBar number={70} total={100} grid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBentoGrid;
