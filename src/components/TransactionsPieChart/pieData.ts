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

const chartColors = [
  "#e06666",
  "#4d8370",
  "#4f81bd",
  "#d6a354",
  "#8e7cc3",
  "#6fa8dc",
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
  rangeType: RangeType | null,
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
        backgroundColor: chartColors,
        hoverOffset: 6,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      let dataArray: number[] = [];
      let title: string = "";

      if (rangeType === null) {
        setChartData({
          labels,
          datasets: [
            {
              label: "Custom Range:",
              data: Array(labels.length).fill(0),
              realData: Array(labels.length).fill(0) as any,
              backgroundColor: chartColors,
              hoverOffset: 6,
            },
          ],
        });
        return;
      }

      switch (rangeType) {
        case "all":
          dataArray = categoryTotals(allTransactions ?? []);
          title = "All-Time:";
          break;
        case "week":
          dataArray = categoryTotals(currentWeekTransactions ?? []);
          title = "This week:";
          break;
        case "lastWeek":
          dataArray = categoryTotals(await getTransactions("lastWeek"));
          title = "Last week:";
          break;
        case "month":
          dataArray = categoryTotals(currentMonthTransactions ?? []);
          title = "This month:";
          break;
        case "lastMonth":
          dataArray = categoryTotals(await getTransactions("lastMonth"));
          title = "Last month:";
          break;
        default:
          dataArray = categoryTotals(await getTransactions(rangeType));
          title = "Custom range";
          break;
      }

      const total = dataArray.reduce((a, b) => a + b, 0);

      if (total === 0) {
        setChartData({
          labels,
          datasets: [
            {
              label: title,
              data: dataArray,
              realData: dataArray as any,
              backgroundColor: chartColors,
              hoverOffset: 6,
            },
          ],
        });
        return;
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
            backgroundColor: chartColors,
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
