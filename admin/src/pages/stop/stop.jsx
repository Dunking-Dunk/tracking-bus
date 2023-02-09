import "./stop.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getAllStop } from "../../store/action";
import { Link } from "react-router-dom"

const List = () => {
    const dispatch = useDispatch()
    const stops = useSelector((state) => state.stops.stops)

    const handleDelete = (id) => {console.log(id)
        // setData(data.filter((item) => item.id !== id));
      };
    
    
    

    const stopColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 200 },
        ,
        {
          field: "stop",
          headerName: "Stop",
          width: 300,
        },
        {
          field: "stopTiming",
          headerName: "Timing",
          width: 100,
        },
        {
          field: "lat",
          headerName: "Latitude",
          width: 200,
        },
        {
          field: "lng",
          headerName: "Longitude",
          width: 200,
        },
        {
          field: "address",
          headerName: "Address",
          width: 200,
        },
      ];

    const stopRow = () => {
        return stops.map((stop, i) => {
          return {
            sno: i + 1,
            id: stop.id,
            stop: stop.name,
            stopTiming: stop.timing,
            lat: stop.coords.latitude,
            lng: stop.coords.longitude,
            address: stop.address ? stop.address : '-'
          }
        })
      }
  

  useEffect(() => {
    dispatch(getAllStop())
  }, [dispatch])

  return (
    <div className="list">
          <Sidebar />
          <div className="listContainer">
          <Navbar />
      <div style={{padding: '10px 20px 10px 20px'}} >
           
              <div className="datatableTitle">
        Add New Stop
        <Link to="/stop/new" className="link">
          Add New
        </Link>
      </div>
              <Datatable row={stopRow()} column={stopColumns} />
          </div>
      
      </div>
    </div>
  )
}

export default List