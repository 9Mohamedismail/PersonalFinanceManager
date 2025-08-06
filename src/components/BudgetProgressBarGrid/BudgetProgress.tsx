import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  number: number;
  total: number;
};

export default function BasicProgressBar({ number, total }: Props) {
  const value = total === 0 ? 0 : (number / total) * 100;

  return (
    <div className="flex flex-col">
      <p className="text-lg font-semibold text-gray-900 mb-2">
        Last Week Transactions
      </p>
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-gray-900 tracking-wide mb-2">
          {`$${value}.00`}
        </p>

        <p className="text-lg font-semibold text-gray-900 tracking-wide mb-2">{`$${total}.00`}</p>
      </div>
      <div className="relative">
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 100,
            backgroundColor: "#6a9c89",
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#16423c",
            },
          }}
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-text tracking-wide">
          {`${Math.round(value)}%`}
        </p>
      </div>
    </div>
  );
}
