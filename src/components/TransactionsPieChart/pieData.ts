import type { ChartData } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { TransactionsContext } from "../../Context/TransactionsContext";
import { getTransactions } from "../../utils/getTransactions";
import type { Dayjs } from "dayjs";

type Transaction = {
  date: string;
  amount: number | string;
  type: "expense" | "income";
  category: string;
};

type RangeType =
  | "all"
  | "week"
  | "lastWeek"
  | "month"
  | "lastMonth"
  | [Dayjs, Dayjs];

export const labels: string[] = [
  "Restaurants",
  "Supermarkets",
  "Transportation",
  "Gasoline",
  "Merchandise",
  "Other",
];

function categoryTotals(transactions: Transaction[]): number[] {
  const index = new Map(labels.map((lable, index) => [lable, index]));
  const totals = Array(labels.length).fill(0) as number[];

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const label = transaction.category;
    const transacationIndex = index.get(label);

    if (transacationIndex === undefined) continue;

    totals[transacationIndex] += Math.abs(Number(transaction.amount));
  }
  return totals;
}

export function TransactionsPieChartData(
  rangeType: RangeType,
): ChartData<"doughnut", number[], string> {
  const { allTransactions, currentWeekTransactions, currentMonthTransactions } =
    useContext(TransactionsContext);

  const [chartData, setChartData] = useState<
    ChartData<"doughnut", number[], string>
  >({
    labels,
    datasets: [
      {
        label: "Spent this week:",
        data: categoryTotals(currentWeekTransactions ?? []),
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
  });

  useEffect(() => {
    async function fetchData() {
      let dataArray: number[] = [];
      let title: string = "";

      switch (rangeType) {
        case "all":
          dataArray = categoryTotals(allTransactions ?? []);
          title = "Overall transactions:";
          break;
        case "week":
          dataArray = categoryTotals(currentWeekTransactions ?? []);
          title = "Spent this week:";
          break;
        case "lastWeek":
          dataArray = categoryTotals(await getTransactions("lastWeek"));
          title = "Spent last week:";
          break;
        case "month":
          dataArray = categoryTotals(currentMonthTransactions ?? []);
          title = "Spent this month:";
          break;
        case "lastMonth":
          dataArray = categoryTotals(await getTransactions("lastMonth"));
          title = "Spent last month:";
          break;
        default:
          dataArray = categoryTotals(await getTransactions(rangeType));
          title = "Spent during custom range";
          break;
      }

      const total = dataArray.reduce((a, b) => a + b, 0);

      if (total === 0) {
        return dataArray;
      }

      let percentages = dataArray.map((v) => (v / total) * 100);

      percentages = percentages.map((p, i) => {
        return dataArray[i] > 0 && p < 1 ? 1 : p;
      });

      const adjustedTotal = percentages.reduce((a, b) => a + b, 0);

      const scaledData = percentages.map((p) => (p / adjustedTotal) * 100);

      setChartData({
        labels,
        datasets: [
          {
            label: title,
            data: scaledData,
            realData: dataArray as any,
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
      });
    }

    fetchData();
  }, [
    rangeType,
    allTransactions,
    currentWeekTransactions,
    currentMonthTransactions,
  ]);

  return chartData;
}
