import axios from "axios";
import { getDateRange } from "./getDateRange";
import type { Dayjs } from "dayjs";

type RangeType =
  | "all"
  | "week"
  | "lastWeek"
  | "month"
  | "lastMonth"
  | [Dayjs, Dayjs];

export async function getTransactions(rangeType: RangeType) {
  const baseUrl = "http://localhost:3000/api/transaction";

  if (rangeType === "all") {
    const res = await axios.get(`${baseUrl}/all`, { withCredentials: true });
    console.log("ALL User's transactions fetched:", res.data.payload);
    return res.data.payload;
  }

  let start, end;

  if (Array.isArray(rangeType)) {
    start = rangeType[0].startOf("day");
    end = rangeType[1].add(1, "day").startOf("day");
  } else {
    ({ start, end } = getDateRange(rangeType));
  }
  const res = await axios.get(baseUrl, {
    params: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
    withCredentials: true,
  });
  console.log(`${rangeType} User's transactions fetched:`, res.data.payload);
  return res.data.payload;
}
