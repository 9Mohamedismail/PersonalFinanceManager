import { DataGrid } from "@mui/x-data-grid";
import columns from "./TransactionsColumns";
import { TransactionsContext } from "../../Context/TransactionsContext";
import { useContext } from "react";

function Transactions({ grid }: { grid: boolean }) {
  const { allTransactions } = useContext(TransactionsContext);

  return (
    <div className="h-full">
      <DataGrid
        rows={!grid ? allTransactions ?? [] : (allTransactions ?? []).slice(-7)}
        columns={columns.map((col) => ({
          ...col,
          sortable: !grid,
          filterable: !grid,
          disableColumnMenu: grid,
        }))}
        hideFooter={grid}
        disableColumnResize={true}
        disableRowSelectionOnClick
        pagination
        density={!grid ? "compact" : undefined}
        sx={{
          "& .MuiDataGrid-cell": {
            color: "#101828",
            fontSize: "18px",
            fontWeight: 400,
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: 400,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#16423c",
          },
          "& .MuiDataGrid-columnSeparator": {
            color: "#4d8370",
          },
          "& .MuiTablePagination-root": {
            fontSize: "18px",
            fontWeight: 400,
          },
          "& .MuiTablePagination-displayedRows": {
            fontSize: "18px",
            fontWeight: 400,
          },
          "& .MuiTablePagination-selectLabel": {
            fontSize: "18px",
            fontWeight: 400,
          },
          backgroundColor: "#ffffff",
          border: "1px solid var(--color-primary)",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
          overflow: "hidden",
          fontFamily: "Inter, sans-serif",
        }}
      />
    </div>
  );
}

export default Transactions;
