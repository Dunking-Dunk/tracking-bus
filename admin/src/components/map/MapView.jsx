import React from "react";
import StopMarker from "../marker/Marker";
import GoogleMapReact from "google-map-react";

const MapView = ({ allStops, addStops }) => {
    return (<div style={{ height: '500px', width: '100%', marginBottom: '20px' }}>
    <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCSzANgbfNQqcu_1jcNtSz21EBCTgB0U1U' }}
        defaultCenter={{
        lat: 13.078339,
        lng: 80.180592
        }} zoom={11} >
            {allStops && allStops.map((stop) => {
                return (
                    <StopMarker key={stop.id} stop={stop} lat={stop.coords.latitude} lng={stop.coords.longitude}  onClick={ addStops } />
            )
        })}
    </GoogleMapReact>
    
</div>)
}

export default MapView