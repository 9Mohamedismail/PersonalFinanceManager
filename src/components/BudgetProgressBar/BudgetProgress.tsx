import LinearProgress from "@mui/material/LinearProgress";
import { TransactionsContext } from "../../Context/TransactionsContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

type BudgetProgressProps = {
  total: number;
  grid: boolean;
};

export default function BudgetProgress({ total, grid }: BudgetProgressProps) {
  const { currentMonthTransactions } = useContext(TransactionsContext);
  const navigate = useNavigate();

  const expensesThisMonth = () => {
    if (!currentMonthTransactions) return 0;
    return Math.abs(
      currentMonthTransactions.reduce((prev, curr) => {
        if (curr.type === "expense") {
          return prev + Number(curr.amount);
        }
        return prev;
      }, 0),
    );
  };

  const value = total === 0 ? 0 : (expensesThisMonth() / total) * 100;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-primary p-6">
      <div className="xl:flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2">
          Budget Progress
        </p>
        {grid && (
          <p
            className="text-primary mb-2 align-center cursor-pointer"
            onClick={() => navigate("/metrics")}
          >
            View Details
          </p>
        )}
      </div>
      <div className="flex justify-between">
        <p className="text-2xl  text-primary tracking-wide mb-2">
          {`$${expensesThisMonth().toFixed(2)}`}
        </p>

        <p className="text-2xl text-primary tracking-wide mb-2">{`$${total.toFixed(2)}`}</p>
      </div>
      <div className="relative">
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 100,
            backgroundColor: "#4d8370",
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#16423c",
            },
          }}
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl  text-white tracking-wide mb-2">
          {`${Math.round(value)}%`}
        </p>
      </div>
    </div>
  );
}
