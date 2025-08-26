import type { ChartData } from "chart.js";
import { useContext } from "react";
import { parseISO, getDay } from "date-fns";
import { TransactionsContext } from "../../Context/TransactionsContext";

type Transaction = {
  date: string;
  amount: number;
  type: "expense" | "income";
};

const labels: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function weeklyTotals(transactions: Transaction[]): number[] {
  const totals = Array(7).fill(0) as number[];

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const day = parseISO(transaction.date);
    const dayNumber = getDay(day);

    const dayIndex = (dayNumber + 6) % 7;

    const value = Math.abs(transaction.amount);
    totals[dayIndex] += value;
  }

  return totals;
}

export function useWeeklyChartData(): ChartData<"line", number[], string> {
  const { weeklyTransactions } = useContext(TransactionsContext);

  const dataArray = weeklyTotals(weeklyTransactions ?? []);

  return {
    labels,
    datasets: [
      {
        label: "",
        data: dataArray,
        borderColor: "#4d8370",
        borderWidth: 3,
        pointBackgroundColor: "#16423c",
        pointBorderWidth: 0,
        backgroundColor: "#f9fafb",
        fill: false,
        tension: 0,
      },
    ],
  };
}
