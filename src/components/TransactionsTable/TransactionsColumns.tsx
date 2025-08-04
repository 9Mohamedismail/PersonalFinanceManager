import type { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Brand",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  { field: "date", headerName: "Date" },
  { field: "vendor", headerName: "Vendor", flex: 1 },
  {
    field: "detail",
    headerName: "Purchased Detail",
    flex: 1,
  },
  { field: "cost", headerName: "Cost" },
  {
    field: "action",
    headerName: "Details",
    renderCell: () => (
      <button className="border rounded-md px-3 text-base font-semibold text-secondary">
        Details
      </button>
    ),
  },
];

export default columns;
