import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

export function getDateRange(
  period: "week" | "month" | "lastWeek" | "lastMonth"
) {
  const now = new Date();

  switch (period) {
    case "week":
      return {
        start: format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        end: format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd"),
      };
    case "month":
      return {
        start: format(startOfMonth(now), "yyyy-MM-dd"),
        end: format(endOfMonth(now), "yyyy-MM-dd"),
      };
    case "lastWeek":
      const lw = subWeeks(now, 1);
      return {
        start: format(startOfWeek(lw, { weekStartsOn: 1 }), "yyyy-MM-dd"),
        end: format(endOfWeek(lw, { weekStartsOn: 1 }), "yyyy-MM-dd"),
      };
    case "lastMonth":
      const lm = subMonths(now, 1);
      return {
        start: format(startOfMonth(lm), "yyyy-MM-dd"),
        end: format(endOfMonth(lm), "yyyy-MM-dd"),
      };
  }
}
