import './busNew.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Switch from '@mui/material/Switch'
import GoogleMapReact from 'google-map-react';
import StopMarker from '../../components/marker/Marker'
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { createBus } from '../../store/action'

const BusNew = () => {
    const allStops = useSelector((state) => state.stops.stops)
    const allTracker = useSelector((state) => state.buses.trackers)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [state, setState] = useState({
        busNumber: null,
        busSet: '',
        busName: '',
        description: '',
        origin: '',
        stops: [],
        morningToCollege: true,
        returnAfter315: true,
        seats: null,
        ac: true,
        tracker: '',
    })
    const [selectedStops, setSelectedStops] = useState([])

    function updateState(data) {
        setState((state) => ({...state,...data} ))
    }

    function handleSubmit() {
        if (state.busNumber && state.busSet.length === 1 && state.busName.length > 3 && state.description.length > 5 && state.origin.length > 3 && state.stops.length >= 1) {
            dispatch(createBus(state))
            navigate('/bus')
        }
     
    } 
    
    function addStops(stop) {
        if (state.stops.indexOf( stop.id) === -1) {
            updateState({ stops: [...state.stops, stop.id] })
            setSelectedStops([...selectedStops, stop])
        }
    }

    function handleDelete(stop) {
        updateState({ stops:state.stops.filter((data) => data !== stop.id) })
        setSelectedStops(selectedStops.filter((data) => data.id !== stop.id)) 
    }
  

    return (
        <div className='newbus'>
            <h1 className='title'>CREATE NEW BUS</h1>
            <div className='newbus__container'>
                <div className='formInput'>
                    <h5>Route Name: </h5>
                    <input type='text' value={state.busName} onChange={(e) => {
                        updateState({ busName: e.target.value })
                    }} />
                </div>
                <div className='formInput'>
                    <h5>Route Number: </h5>
                    <input type='number' onChange={(e) => {
                        updateState({busNumber: e.target.value})
                    }}  min='0' placeholder='only single digit' />
                </div>
                <div className='formInput'>
                    <h5>Route Set: </h5>
                    <input type='text' value={state.busSet} onChange={(e) => {
                        updateState({ busSet: e.target.value })
                    }} placeholder='only one word'  />
                </div>
                <div className='formInput'>
                    <h5>Route Origin:</h5>
                    <input type='text' value={state.origin} onChange={(e) => {
                        updateState({origin: e.target.value})
                    }} placeholder='location name of origin' />
                </div>
                <div className='formInput'>
                    <h5>Route Description:</h5>
                    <textarea type='text' value={state.description} onChange={(e) => {
                        updateState({description: e.target.value})
                    }} />
                                 <div className='formInput'>
                    <h5>Stops:</h5>
                    <div style={{ height: '500px', width: '100%', marginBottom: '20px' }}>
                        <GoogleMapReact
                              bootstrapURLKeys={{ key:'AIzaSyCSzANgbfNQqcu_1jcNtSz21EBCTgB0U1U' }}
                            defaultCenter={{
                            lat: 13.078339,
                            lng: 80.180592
                            }} zoom={11} >
                            {allStops && allStops.map((stop) => {
                                return (
                                    <StopMarker key={stop.id} stop={stop} lat={stop.coords.latitude} lng={stop.coords.longitude} onClick={addStops} />
                                )
                            })}
                        </GoogleMapReact>
                    </div>
                    <Paper
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                    }}
                    component="ul">
                    {selectedStops && selectedStops.map((stop, index) => {
                        return (
                            <div className='chip__container' key={stop.id}>
                                <h5>{index + 1}</h5>
                                           <Chip
                                    label={stop.name}
                                 
                            onDelete={() => handleDelete(stop)}
                          />
                            </div>
                 
                        )
                    })} 
                        </Paper>
                </div>
                </div>
                <div className='formInput'>
                    <h5>GPS TRACKER</h5>
                    {state.tracker && <h5>Tracker Selected: <strong>{state.tracker}</strong></h5>}
                    {allTracker && (
                        <div className='tracker'>
                            {allTracker.map((tracker) => {
                                return (
                                    <div className='tracker__container' key={tracker.id} onClick={() => {
                                        updateState({tracker: tracker.id})
                                    }}>
                                        <h5>Id: {tracker.id}</h5>
                                        <h5>GPS ID: {tracker.gpsId}</h5>
                                        {tracker.onBusRoute && <h5>on bus: {tracker.onBusRoute}</h5>}
                                        {tracker.bus && <h5>connected to bus: {tracker.bus}</h5>}
                                    </div>
                                )
                            })}
                        </div>
                    ) }
                </div>
                <div className='formInput'>
                    <h5>Bus Capacity:</h5>
                    <input type='number' min='0'  onChange={(e) => {
                        updateState({seats: e.target.value})
                    }} placeholder='bus total seats' />
                </div>
                <div className='formInput'>
                    <h5>Bus Morning to college:</h5>
                    <Switch
  checked={state.morningToCollege}
  onChange={(e) => {
    updateState({ morningToCollege: e.target.checked})
                        }}
                        value={state.returnAfter315}
  inputProps={{ 'aria-label': 'controlled' }}
/>
                </div>
                <div className='formInput'>
                    <h5>Bus Return after 3:15 pm:</h5>
                    <Switch
                        value={state.returnAfter315}
                        checked={state.returnAfter315}
                        onChange={(e) => {
                            updateState({ returnAfter315: e.target.checked})
                        }}
  inputProps={{ 'aria-label': 'controlled' }}
/>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default BusNew