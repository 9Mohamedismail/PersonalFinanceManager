import type { ChartData } from "chart.js";
import { useContext, useEffect, useState } from "react";
import {
  parseISO,
  getDay,
  getWeekOfMonth,
  getMonth,
  endOfMonth,
} from "date-fns";
import {
  TransactionsContext,
  type Transactions,
} from "../../Context/TransactionsContext";
import { getTransactions } from "../../utils/getTransactions";

function categoryTotals(
  transactions: Transactions[],
  rangeType: string
): number[] {
  const labels = getLabels(rangeType);
  const totals = Array(labels.length).fill(0) as number[];

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const date = parseISO(transaction.date);
    const amount = Math.abs(Number(transaction.amount));

    switch (rangeType) {
      case "week":
      case "lastWeek": {
        const dayIndex = (getDay(date) + 6) % 7;
        totals[dayIndex] += amount;
        break;
      }
      case "month":
      case "lastMonth": {
        const weekIdx = Math.min(getWeekOfMonth(date) - 1, 3); // clamp to 0–3
        totals[weekIdx] += amount;
        break;
      }
      case "all": {
        const monthIdx = getMonth(date);
        totals[monthIdx] += amount;
        break;
      }
    }
  }

  return totals;
}

export function getWeeksInMonth(date: Date): number {
  const lastDay = endOfMonth(date);
  return getWeekOfMonth(lastDay);
}

export function getLabels(rangeType: string): string[] {
  switch (rangeType) {
    case "week":
    case "lastWeek":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case "month":
    case "lastMonth": {
      const now = new Date();
      const weeksCount = getWeeksInMonth(
        rangeType === "lastMonth"
          ? new Date(now.getFullYear(), now.getMonth() - 1)
          : now
      );
      return Array.from({ length: weeksCount }, (_, i) => `Week ${i + 1}`);
    }
    case "all":
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    default:
      return [];
  }
}

export function TransactionsLineChartData(
  rangeType: "all" | "week" | "lastWeek" | "month" | "lastMonth"
): ChartData<"line", number[], string> {
  const { allTransactions, currentWeekTransactions, currentMonthTransactions } =
    useContext(TransactionsContext);

  const [chartData, setChartData] = useState<
    ChartData<"line", number[], string>
  >({
    labels: getLabels(rangeType),
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "#4d8370",
        borderWidth: 3,
        pointBackgroundColor: "#16423c",
        pointBorderWidth: 0,
        backgroundColor: "#f9fafb",
        fill: false,
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      let dataArray: number[] = [];
      let title: string = "";

      switch (rangeType) {
        case "all":
          dataArray = categoryTotals(allTransactions ?? [], "all");
          title = "All-Time Transactions:";
          break;
        case "week":
          dataArray = categoryTotals(currentWeekTransactions ?? [], "week");
          title = "This Week Transactions:";
          break;
        case "lastWeek":
          dataArray = categoryTotals(
            await getTransactions("lastWeek"),
            "lastWeek"
          );
          title = "Last Week Transactions:";
          break;
        case "month":
          dataArray = categoryTotals(currentMonthTransactions ?? [], "month");
          title = "This Month Transactions:";
          break;
        case "lastMonth":
          dataArray = categoryTotals(
            await getTransactions("lastMonth"),
            "lastMonth"
          );
          title = "Last Month Transactions:";
          break;
      }

      setChartData({
        labels: getLabels(rangeType),
        datasets: [
          {
            label: title,
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
