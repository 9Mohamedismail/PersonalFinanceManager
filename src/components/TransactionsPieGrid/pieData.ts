import type { ChartData } from "chart.js";
import { useContext } from "react";
import { TransactionsContext } from "../../Context/TransactionsContext";

type Transaction = {
  date: string;
  amount: number;
  type: "expense" | "income";
  category: string;
};

export const labels: string[] = [
  "Restaurants",
  "Supermarkets",
  "Transportation",
  "Gasoline",
  "Merchandise",
];

function categoryTotals(transactions: Transaction[]): number[] {
  const index = new Map(labels.map((lable, index) => [lable, index]));
  const totals = Array(labels.length).fill(0) as number[];

  for (const transaction of transactions) {
    const label = transaction.category;
    const transacationIndex = index.get(label);

    if (transacationIndex === undefined) continue;

    totals[transacationIndex] += Math.abs(transaction.amount);
  }
  return totals;
}

export function useWeeklyCategoryChartData(): ChartData<
  "doughnut",
  number[],
  string
> {
  const { weeklyTransactions } = useContext(TransactionsContext);

  const dataArray = categoryTotals(weeklyTransactions ?? []);

  return {
    labels,
    datasets: [
      {
        label: "Spent this week:",
        data: dataArray,
        backgroundColor: [
          "#e06666",
          "#4d8370",
          "#4f81bd",
          "#d6a354",
          "#8e7cc3",
        ],
        hoverOffset: 6,
      },
    ],
  };
}
