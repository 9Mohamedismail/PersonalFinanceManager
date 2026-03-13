import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router";

type BudgetProgressProps = {
  number: number;
  total: number;
  grid: boolean;
};

export default function BudgetProgress({
  number,
  total,
  grid,
}: BudgetProgressProps) {
  const value = total === 0 ? 0 : (number / total) * 100;
  const navigate = useNavigate();
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
          {`$${value}.00`}
        </p>

        <p className="text-2xl text-primary tracking-wide mb-2">{`$${total}.00`}</p>
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
