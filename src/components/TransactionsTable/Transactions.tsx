import { DataGrid } from "@mui/x-data-grid";
import columns from "./TransactionsColumns";
import rows from "./TransactionsRows";

function Transactions() {
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

export default Transactions;
