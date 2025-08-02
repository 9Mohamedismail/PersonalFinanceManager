import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
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

const rows = [
  {
    id: "Pizza Hut",
    date: "28 May",
    vendor: "Pizza Hut",
    detail: "Tandoori Paneer Pizza - M",
    cost: "$87.00",
  },
  {
    id: "Starbucks",
    date: "27 May",
    vendor: "Star Bucks",
    detail: "2 Cappuccino with Cookies",
    cost: "$28.00",
  },
  {
    id: "Jio",
    date: "26 May",
    vendor: "Jio",
    detail: "Prepaid Recharge",
    cost: "$10.00",
  },
  {
    id: "Dribbble",
    date: "26 May",
    vendor: "Dribbble",
    detail: "Purchased Pro Account",
    cost: "$36.00",
  },
  {
    id: "Ola",
    date: "26 May",
    vendor: "Ola",
    detail: "Triplicane to Jazz Cinema",
    cost: "$10.00",
  },
];

export default function DataTable() {
  return (
    <DataGrid
      rows={rows}
      columns={columns.map((col) => ({
        ...col,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
      }))}
      hideFooter={true}
      disableRowSelectionOnClick
      sx={{
        "& .MuiDataGrid-cell": {
          color: "#101828",
          fontSize: "16px",
          borderColor: "#c4dad2",
          borderBottom: "1px solid #c4dad2",
          backgroundColor: "#c4dad2",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          color: "#16423c",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.025em",
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#6a9c89",
          borderBottom: "none !important",
          borderRight: "none !important",
        },
        "& .MuiDataGrid-columnSeparator": {
          color: "#6a9c89",
        },
        border: "1px solid #c4dad2",
        borderRadius: "0.25rem",
        overflow: "hidden",
      }}
    />
  );
}
