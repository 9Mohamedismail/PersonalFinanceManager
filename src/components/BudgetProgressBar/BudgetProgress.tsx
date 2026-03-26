import LinearProgress from "@mui/material/LinearProgress";
import { TransactionsContext } from "../../Context/TransactionsContext";
import { SettingsContext } from "../../Context/SettingsContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import EditBudgetModal from "../EditBudgetModal";
import Modal from "@mui/material/Modal";

type BudgetProgressProps = {
  grid: boolean;
};

export default function BudgetProgress({ grid }: BudgetProgressProps) {
  const [open, setOpen] = useState(false);
  const { currentMonthTransactions } = useContext(TransactionsContext);
  const { settings } = useContext(SettingsContext);
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

  const total = settings === null ? 0 : settings.budgetTotal;
  const value = total ? (expensesThisMonth() / total) * 100 : 0;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-primary p-6">
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-gray-900 uppercase mb-2">
          Budget Progress
        </p>
        {grid ? (
          <p
            className="text-primary mb-2 align-center cursor-pointer"
            onClick={() => navigate("/metrics")}
          >
            View Details
          </p>
        ) : (
          <button
            onClick={() => setOpen(!open)}
            className="border-2 bg-white rounded shadow-sm border-orange-500 py-1 px-4 sm:text-base font-semibold text-orange-500 uppercase tracking-wide cursor-pointer mb-2 align-center"
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex justify-between">
        <p className="text-2xl  text-primary tracking-wide mb-2">
          {`$${total ? expensesThisMonth().toFixed(2) : 0}`}
        </p>

        <p className="text-2xl text-primary tracking-wide mb-2">{`$${total ? total : 0}`}</p>
      </div>
      <div className="relative">
        <LinearProgress
          variant="determinate"
          value={Math.min(value, 100)}
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
          {total
            ? `${Math.min(Number(value.toFixed(2)), 100)}%`
            : "No budget set"}
        </p>
      </div>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <div
          className="
    flex min-h-screen justify-center items-center   
    lg:block lg:min-h-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
    py-10 px-4 lg:px-8 lg:w-1/2
  "
        >
          <EditBudgetModal handleClose={() => setOpen(!open)} />
        </div>
      </Modal>
    </div>
  );
}
