import type { ChartData } from "chart.js";
import { useContext } from "react";
import { parseISO, getDay } from "date-fns";
import {
  TransactionsContext,
  type Transactions,
} from "../../Context/TransactionsContext";

const labels: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function weeklyTotals(transactions: Transactions[]): number[] {
  const totals = Array(7).fill(0) as number[];

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const day = parseISO(transaction.date);
    const dayNumber = getDay(day);

    const dayIndex = (dayNumber + 6) % 7;

    const value = Math.abs(Number(transaction.amount));
    totals[dayIndex] += value;
  }

  return totals;
}

export function useWeeklyChartData(): ChartData<"line", number[], string> {
  const { currentWeekTransactions } = useContext(TransactionsContext);

  const dataArray = weeklyTotals(currentWeekTransactions ?? []);

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
