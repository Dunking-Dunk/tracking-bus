import "./bus.scss"
import Datatable from "../../components/datatable/Datatable"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { deleteBus, getAllBuses } from "../../store/action";
import { Link } from "react-router-dom"

const List = () => {
    const dispatch = useDispatch()
    const buses = useSelector((state) => state.buses.buses)
  const handleDelete = (id) => {
        dispatch(deleteBus(id))
      };
    
    const busColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 200 },
        {
          field: "bus",
          headerName: "Bus",
          width: 100,
        },
        {
          field: "busName",
          headerName: "Bus Name",
          width: 200,
        },
        {
          field: "status",
          headerName: "Status",
          width: 160,
          renderCell: (params) => {
            return (
              <div className={`cellWithStatus ${params.row.status}`}>
                {params.row.status}
              </div>
            );
          },
      },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
        
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
      ];
      
    
    const busRow = () => {
        return buses.map((bus, i) => {
          return {
            sno: i + 1,
            id: bus.id,
            bus: `${bus.busNumber}-${bus.busSet}`,
            busName: bus.busName,
            status: 'active'
          }
        })
      }

  useEffect(() => {
    dispatch(getAllBuses())
  }, [dispatch])

  return (

      <div style={{padding: '10px 20px 10px 20px'}} >
           
              <div className="datatableTitle">
        Add New Bus
        <Link to="/bus/new" className="link">
          Add New
        </Link>
      </div>
              <Datatable row={busRow()} column={busColumns} />
          </div>
      
  )
}

export default List