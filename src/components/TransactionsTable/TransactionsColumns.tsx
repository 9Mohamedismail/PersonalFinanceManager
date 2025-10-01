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
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 200,
    sortable: false,
    filterable: true,
  },
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
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: () => (
      <button className="border-2 bg-white rounded-md shadow-sm border-secondary px-3 text-base font-semibold text-secondary uppercase tracking-wide cursor-pointer">
        Details
      </button>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

export default columns;
