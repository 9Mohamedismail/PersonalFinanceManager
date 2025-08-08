import BudgetProgressBar from "../components/BudgetProgressBarGrid/BudgetProgress";
import TransactionsPie from "../components/TransactionsPieGrid/TransactionsPie";
import WeekTransactionsGrid from "../components/WeeklyTransactionsGrid/WeekTransactions";

function MetricsPage() {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-8">
      <div className="grid lg:grid-cols-3 lg:grid-rows-[auto,auto] gap-4 ">
        <TransactionsPie grid={false} />

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <BudgetProgressBar number={70} total={100} />
          <BudgetProgressBar number={70} total={100} />
          <BudgetProgressBar number={70} total={100} />
          <BudgetProgressBar number={70} total={100} />

          <div className="col-span-2">
            <WeekTransactionsGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MetricsPage;
