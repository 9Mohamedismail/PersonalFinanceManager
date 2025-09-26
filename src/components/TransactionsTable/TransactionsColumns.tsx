import type { GridColDef } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueFormatter: (params) => {
      return format(parseISO(params), "MMM d, yyyy");
    },
  },
  { field: "description", headerName: "Description", flex: 1, minWidth: 200 },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: 200,
    type: "number",
    valueFormatter: (params) => {
      return Number(params).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  { field: "category", headerName: "Category", width: 200 },
  {
    field: "details",
    headerName: "Details",
    width: 100,

    renderCell: () => (
      <button className="border rounded-md px-3 text-base font-semibold text-secondary">
        Details
      </button>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
  },
];

export default columns;
