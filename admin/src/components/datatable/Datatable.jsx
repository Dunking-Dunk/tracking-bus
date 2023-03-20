import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const Datatable = ({ row, column, setRowSelection }) => {
 
  
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
         rows={row}
        columns={column}
        pageSize={9}
        rowsPerPageOptions={[25]}
        checkboxSelection
        onSelectionModelChange={itm => setRowSelection && setRowSelection(itm)}
      />
    </div>
  );
};

export default Datatable;
