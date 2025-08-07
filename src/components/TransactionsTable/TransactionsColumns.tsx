import type { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "date", headerName: "Date", width: 120 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 200 },
  { field: "amount", headerName: "Amount", width: 100 },
  { field: "category", headerName: "Category", width: 200 },
  {
    field: "action",
    headerName: "Details",
    width: 100,
    renderCell: () => (
      <button className="border rounded-md px-3 text-base font-semibold text-secondary">
        Details
      </button>
    ),
  },
];

export default columns;
