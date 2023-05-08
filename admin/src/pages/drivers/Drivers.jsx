import './drivers.scss'
import React, {  useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { createDriver } from '../../store/action';
import Datatable from '../../components/datatable/Datatable';

const Drivers = () => {
    const dispatch = useDispatch()
    const drivers = useSelector((state) => state.drivers.drivers)

    const [state, setState] = useState({
        name: '',
        phoneNumber: '',
        avatar: []
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()

        formData.append('avatar', state.avatar)
        formData.append('name', state.name)
        formData.append('phoneNumber', state.phoneNumber)

        if (state.name.length > 3 && state.phoneNumber)
            dispatch(createDriver(formData))
        setState({
                name: '',
            phoneNumber: '',
            avatar: []
        })
    }   

    const handleDelete = () => {
        
    }
    console.log(drivers)

    const driverColumns = [
        { field: "sno", headerName: "SNO", width: 70 },
        { field: "id", headerName: "ID", width: 150 },
        {
            field: "image",
            headerName: "Image",
            width: 100,
            renderCell: (params) => {
                const base64String = btoa(String.fromCharCode(...new Uint8Array(params.value.data?.data)))
            return (
                 
                            <img src={`data:image/png;base64,${base64String}`} alt="" className='driver__img'/>
                
                );
              },
        },
        {
            field: "name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 200,
        },
        {
          field: "bus",
          headerName: "Bus",
          width: 100,
        }, 
      {
        field: "action",
        headerName: "Action",
        width: 150,
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
      
    
    const driverRow = () => {
        return drivers.map((driver, i) => {
          return {
            sno: i + 1,
              id: driver.id,
            image: driver.photoUrl,
            name: driver.name,
            phoneNumber: driver.phoneNumber,
            bus: driver.busId ? driver.busId : 'no bus',
          }
        })
      }


    return (
        <div className="driver">
            <h1 className="driver__form__title">New Driver</h1>
            <div className="driver__form">
                <form onSubmit={handleSubmit} enctype="multipart/form-data" >
                <div className="driver__form__container">
                    <h3>Name</h3>
                    <input type="text" class="driver__form__input" onChange={(e) => {
                        setState((data) => ({...data, name: e.target.value}) )
                    }} value={state.name} placeholder="Name"/>
                </div>
                    <div className="driver__form__container">
                    <h3>Phone Number</h3>
                    <input type="text" class="driver__form__input"  onChange={(e) => {
                        setState((data) => ({...data, phoneNumber: e.target.value}) )
                    }} value={state.phoneNumber} placeholder="Phone number"/>
                    </div>
                    <div className="driver__form__container">
                        <h3>photo</h3>
                        <input type="file" name='avatar' class="driver__form__input"  onChange={(e) => {
                        setState((data) => ({...data, avatar: e.target.files[0]}))
                    }} />      
                    </div>
                    <button className="driver__form__btn">Create</button>
                </form>
                 <hr/>
            </div>
            <Datatable row={driverRow()} column={driverColumns}  />
        </div>
    )
}

export default Drivers