import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const Datatable = ({row, column}) => {
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
         rows={row}
        columns={column}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;