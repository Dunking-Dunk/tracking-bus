import "./bus.scss"
import Datatable from "../../components/datatable/Datatable"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { deleteBus, getBus } from "../../store/action";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const List = () => {
    const dispatch = useDispatch()
  const buses = useSelector((state) => state.buses.buses)
  const navigate = useNavigate()


  const handleDelete = (id) => {
        dispatch(deleteBus(id))
  };
  
  const handleUpdate = (id) => {
    dispatch(getBus(id, true)).then(() => {
      navigate(`/bus/edit/${id}`)
    })
    
  };

  const handleView = (id) => {
    navigate(`/bus/${id}`)
  }
    
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
          width: 150,
      },  {
        field: "depature",
        headerName: "Depature",
        width: 100,
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
        width: 250,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <div
                className="link"
                onClick={() => handleView(params.row.id)}
              >
                View
              </div>
               <div
                className="updateButton"
                onClick={() => handleUpdate(params.row.id)}
              >
                update
              </div>
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
            depature: bus.returnAfter315 ? '3:15 pm' : bus.returnAfter1 ? '1:00 pm':'5:00 pm',
            status: bus.status ? "active" : "passive",
          }
        })
      }

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