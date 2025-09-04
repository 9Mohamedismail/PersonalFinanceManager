import BalanceGrid from "./BalanceGrid";
import BudgetProgressBar from "./BudgetProgressBarGrid/BudgetProgress";
import Transactions from "./TransactionsTable/Transactions";
import TransactionsPie from "./TransactionsPieGrid/TransactionsPie";
import WeekTransactionsGrid from "./WeeklyTransactionsGrid/WeekTransactions";

function MainBentoGrid() {
  return (
    <div className="py-10 px-4 lg:px-8">
      <div className="grid xl:grid-cols-3 xl:grid-rows-[auto,auto] gap-4">
        <div className="flex flex-col xl:col-span-2 xl:flex-row items-start gap-4 min-w-0">
          <div className="lg:w-[300px] w-full shrink min-w-0 ">
            <BalanceGrid />
          </div>
          <div className="w-full xl:flex-1 shrink min-w-0">
            <WeekTransactionsGrid grid />
          </div>
        </div>
        <div className="xl:col-start-1 xl:row-start-2 xl:col-span-2 h-100 min-w-0 justify-between">
          <Transactions grid />
        </div>

        <div className="xl:col-start-3 xl:row-start-1 xl:row-span-2 flex flex-col gap-4 min-w-0">
          <TransactionsPie grid />
          <div className="xl:h-[225px]">
            <BudgetProgressBar number={70} total={100} grid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBentoGrid;
