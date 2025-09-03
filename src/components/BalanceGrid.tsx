import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { TransactionsContext } from "../Context/TransactionsContext";
import { useContext } from "react";

function BalanceGrid() {
  const { allTransactions, monthlyTransactions } =
    useContext(TransactionsContext);

  const findBalance = () => {
    if (!allTransactions) return 0;
    return allTransactions.reduce(
      (prev, curr) => prev + Number(curr.amount),
      0
    );
  };

  const balanceThisMonth = () => {
    const totalMonthBal = !monthlyTransactions
      ? 0
      : monthlyTransactions.reduce(
          (prev, curr) => prev + Number(curr.amount),
          0
        );

    return (
      <span
        className="
      inline-flex items-center
      gap-1.5
      rounded-lg border border-primary bg-white
      px-4 py-1
      text-xl xl:text-lg text-primary tracking-wide shadow-sm
    "
      >
        {totalMonthBal < 0 ? (
          <FiChevronDown className="w-4 h-4 text-[#fc100d]" />
        ) : (
          <FiChevronUp className="w-4 h-4 text-[#4BB543]" />
        )}
        {totalMonthBal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
          maximumFractionDigits: 2,
        })}
      </span>
    );
  };

  const expensesThisMonth = () => {
    if (!monthlyTransactions) return 0;
    return monthlyTransactions.reduce((prev, curr) => {
      if (curr.type === "expense") {
        return Math.abs(prev + Number(curr.amount));
      }
      return prev;
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-primary p-6 h-full flex flex-col xl:h-[320px]">
      <div className="flex flex-col gap-y-5 xl:gap-y-10">
        <section className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-900 uppercase">
            Your Balance
          </p>
          <p className="text-4xl text-primary tracking-wide">
            {findBalance().toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
              maximumFractionDigits: 2,
            })}
          </p>
          <div className="flex justify-center items-center gap-4">
            <p className="text-xl xl:text-lg text-gray-900">This Month</p>
            {balanceThisMonth()}
          </div>
        </section>

        <section className="flex flex-col items-center text-center xl:block xl:text-left xl:space-y-2 ">
          <hr className="border-primary w-full mb-5" />
          <p className="text-lg font-semibold text-gray-900 uppercase">
            Month Summary
          </p>
          <div className="flex gap-6 mt-2 xl:ml-0 xl:justify-between">
            <div className="flex items-baseline gap-2 xl:block">
              <p className="text-2xl text-primary tracking-wide">
                {expensesThisMonth().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  notation: "compact",
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="text-xl xl:text-lg text-gray-900">Expenses</p>
            </div>

            <div className="flex items-baseline gap-2 xl:block">
              <p className="text-2xl text-primary tracking-wide">
                {monthlyTransactions?.length}
              </p>
              <p className="text-xl xl:text-lg text-gray-900">Transactions</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BalanceGrid;
