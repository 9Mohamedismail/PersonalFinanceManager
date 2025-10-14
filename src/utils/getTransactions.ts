import axios from "axios";
import { getDateRange } from "./getDateRange";

export async function getTransactions(
  rangeType: "all" | "week" | "lastWeek" | "month" | "lastMonth"
) {
  const baseUrl = "http://localhost:3000/api/transaction";

  if (rangeType === "all") {
    const res = await axios.get(`${baseUrl}/all`, { withCredentials: true });
    console.log("ALL User's transactions fetched:", res.data.payload);
    return res.data.payload;
  }

  const { start, end } = getDateRange(rangeType);
  const res = await axios.get(baseUrl, {
    params: { start, end },
    withCredentials: true,
  });
  console.log(`${rangeType} User's transactions fetched:`, res.data.payload);
  return res.data.payload;
}
