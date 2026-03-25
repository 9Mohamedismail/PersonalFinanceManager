import {
  addMonths,
  addWeeks,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

export function getDateRange(
  period: "week" | "month" | "lastWeek" | "lastMonth",
) {
  const now = new Date();

  switch (period) {
    case "week":
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: addWeeks(startOfWeek(now, { weekStartsOn: 1 }), 1),
      };
    case "month":
      const start = startOfMonth(now);
      return {
        start,
        end: addMonths(start, 1),
      };
    case "lastWeek":
      const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 });
      return {
        start: subWeeks(thisWeekStart, 1),
        end: thisWeekStart,
      };
    case "lastMonth":
      const thisMonthStart = startOfMonth(now);
      return {
        start: subMonths(thisMonthStart, 1),
        end: thisMonthStart,
      };
  }
}
