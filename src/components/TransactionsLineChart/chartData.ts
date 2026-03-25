import type { ChartData } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { parseISO, endOfMonth, getWeekOfMonth, getMonth } from "date-fns";
import {
  TransactionsContext,
  type Transactions,
} from "../../Context/TransactionsContext";
import { getTransactions } from "../../utils/getTransactions";
import type { Dayjs } from "dayjs";

type RangeType =
  | "all"
  | "week"
  | "lastWeek"
  | "month"
  | "lastMonth"
  | [Dayjs, Dayjs];

function getWeeksInMonth(date: Date): number {
  const lastDay = endOfMonth(date);
  return getWeekOfMonth(lastDay);
}

function daysBetweenUTC(a: Date, b: Date) {
  const utcA = Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate());
  const utcB = Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate());
  return Math.floor((utcB - utcA) / (1000 * 60 * 60 * 24));
}

function getCustomLabels(range: [Dayjs, Dayjs]): string[] {
  const start = range[0].startOf("day").toDate();
  const end = range[1].startOf("day").toDate();
  const totalDays = daysBetweenUTC(start, end) + 1;

  if (totalDays <= 7) {
    const labels: string[] = [];

    const windowStart = new Date(
      Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() - 6),
    );

    for (let i = 0; i < 7; i++) {
      const current = new Date(
        Date.UTC(
          windowStart.getUTCFullYear(),
          windowStart.getUTCMonth(),
          windowStart.getUTCDate() + i,
        ),
      );

      const month = current.toLocaleString("en-US", {
        month: "short",
        timeZone: "UTC",
      });

      labels.push(`${month} ${current.getUTCDate()}`);
    }

    return labels;
  }

  if (totalDays <= 31) {
    const weekCount = Math.ceil(totalDays / 7);
    return Array.from({ length: weekCount }, (_, i) => `Week ${i + 1}`);
  }

  const labels: string[] = [];
  const monthLabels = [
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

  let year = start.getUTCFullYear();
  let month = start.getUTCMonth();

  while (
    year < end.getUTCFullYear() ||
    (year === end.getUTCFullYear() && month <= end.getUTCMonth())
  ) {
    labels.push(monthLabels[month]);
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  return labels;
}

function getLabels(rangeType: RangeType | null): string[] {
  if (rangeType === null) return [];

  if (Array.isArray(rangeType)) {
    return getCustomLabels(rangeType);
  }

  switch (rangeType) {
    case "week":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case "lastWeek": {
      const labels: string[] = [];
      const now = new Date();

      const thisWeekMonday = new Date(now);
      const day = thisWeekMonday.getDay();
      const mondayOffset = day === 0 ? -6 : 1 - day;
      thisWeekMonday.setDate(thisWeekMonday.getDate() + mondayOffset);

      const lastWeekMonday = new Date(thisWeekMonday);
      lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);

      for (let i = 0; i < 7; i++) {
        const current = new Date(lastWeekMonday);
        current.setDate(lastWeekMonday.getDate() + i);

        const month = current.toLocaleString("en-US", {
          month: "short",
        });

        labels.push(`${month} ${current.getDate()}`);
      }

      return labels;
    }
    case "month":
    case "lastMonth": {
      const now = new Date();
      const weeksCount = getWeeksInMonth(
        rangeType === "lastMonth"
          ? new Date(now.getFullYear(), now.getMonth() - 1)
          : now,
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
  }
}

function categoryTotals(
  transactions: Transactions[],
  rangeType: RangeType,
): number[] {
  const labels = getLabels(rangeType);
  const totals = Array(labels.length).fill(0) as number[];

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const date = parseISO(transaction.date);
    const amount = Math.abs(Number(transaction.amount));

    if (Array.isArray(rangeType)) {
      const start = rangeType[0].startOf("day").toDate();
      const end = rangeType[1].startOf("day").toDate();
      const totalDays = daysBetweenUTC(start, end) + 1;

      if (totalDays <= 7) {
        const windowStart = new Date(
          Date.UTC(
            end.getUTCFullYear(),
            end.getUTCMonth(),
            end.getUTCDate() - 6,
          ),
        );

        const diff = daysBetweenUTC(windowStart, date);
        if (diff >= 0 && diff < 7) {
          totals[diff] += amount;
        }
      } else if (totalDays <= 31) {
        const diff = daysBetweenUTC(start, date);
        if (diff >= 0) {
          const weekIndex = Math.floor(diff / 7);
          if (weekIndex < totals.length) {
            totals[weekIndex] += amount;
          }
        }
      } else {
        const monthIndex =
          (date.getUTCFullYear() - start.getUTCFullYear()) * 12 +
          (date.getUTCMonth() - start.getUTCMonth());

        if (monthIndex >= 0 && monthIndex < totals.length) {
          totals[monthIndex] += amount;
        }
      }

      continue;
    }

    switch (rangeType) {
      case "week":
      case "lastWeek": {
        const dayIndex = (date.getUTCDay() + 6) % 7;
        totals[dayIndex] += amount;
        break;
      }

      case "month":
      case "lastMonth": {
        const weekIdx = Math.min(getWeekOfMonth(date) - 1, totals.length - 1);
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

export function TransactionsLineChartData(
  rangeType: RangeType | null,
): ChartData<"line", number[], string> {
  const { allTransactions, currentWeekTransactions, currentMonthTransactions } =
    useContext(TransactionsContext);

  const [chartData, setChartData] = useState<
    ChartData<"line", number[], string>
  >({
    labels: getLabels(rangeType),
    datasets: [
      {
        label: "This Week Transactions:",
        data: [],
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

  useEffect(() => {
    async function fetchData() {
      let dataArray: number[] = [];
      let title = "";

      if (rangeType === null) {
        setChartData({
          labels: [],
          datasets: [
            {
              label: "Transactions during custom range:",
              data: [],
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
        return;
      }

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
            "lastWeek",
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
            "lastMonth",
          );
          title = "Last Month Transactions:";
          break;

        default:
          dataArray = categoryTotals(
            await getTransactions(rangeType),
            rangeType,
          );
          title = "Transactions during custom range:";
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
