import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TransactionsContext } from "../Context/TransactionsContext";
import { useContext } from "react";

function BalanceGrid() {
  const { transactions } = useContext(TransactionsContext);

  const findBalance = () => {
    if (!transactions) return 0;
    return transactions.reduce((prev, curr) => prev + curr.amount, 0);
  };

  const balanceThisMonth = () => {
    const totalMonthBal = !transactions
      ? 0
      : transactions.reduce((prev, curr) => prev + curr.amount, 0);

    return (
      <span className="inline-flex items-center gap-2 border rounded-full px-3 text-lg font-semibold text-gray-900 tracking-wide">
        {totalMonthBal < 0 ? <FiChevronDown /> : <FiChevronUp />}
        {totalMonthBal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
    );
  };

  const expensesThisMonth = () => {
    if (!transactions) return 0;
    return transactions.reduce((prev, curr) => {
      if (curr.type === "expense") {
        return prev + curr.amount;
      }
      return prev;
    }, 0);
  };

  return (
    <div className="bg-secondary-100 rounded p-6">
      <div className="flex flex-col gap-y-10">
        <section className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-900 uppercase">
            Your Balance
          </p>
          <p className="text-4xl font-bold text-primary tracking-wide">
            {findBalance().toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <div className="flex justify-center items-center gap-4">
            <p className="text-lg text-gray-900">This Month</p>
            {balanceThisMonth()}
          </div>
        </section>

        <section className="space-y-2">
          <hr className="border-primary" />
          <p className="text-lg font-semibold text-gray-900 uppercase">
            MONTH Summary
          </p>
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900 tracking-wide">
                {expensesThisMonth().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <p className="text-lg text-gray-900">Expenses</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 tracking-wide">
                {transactions?.length}
              </p>
              <p className="text-lg text-gray-900">Transactions</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BalanceGrid;
