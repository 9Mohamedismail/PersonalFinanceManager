import BudgetProgressBar from "../components/BudgetProgressBarGrid/BudgetProgress";
import TransactionsPie from "../components/TransactionsPieGrid/TransactionsPie";
import WeekTransactionsGrid from "../components/WeeklyTransactionsGrid/WeekTransactions";

function MetricsPage() {
  return (
    <div className="bg-gray-50 py-10 px-4 lg:px-8 min-w-0">
      <div className="bg-secondary-100 rounded p-6 min-w-0">
        <BudgetProgressBar number={70} total={100} />
      </div>
      <div className="min-w-0">
        <TransactionsPie />
      </div>
      <div className="min-w-0">
        <WeekTransactionsGrid />
      </div>
    </div>
  );
}

export default MetricsPage;
