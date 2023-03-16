import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import GoogleMapReact from 'google-map-react';
import { useSelector } from 'react-redux'
import StopMarker from '../../components/marker/Marker'
import MapView from "../../components/map/MapView";


const Home = () => {
  const buses = useSelector((state) => state.buses.buses)
  const allStops = useSelector((state) => state.stops.stops)

  return (
    <div className="homeContainer">
      <div style={{ height: '500px', width: '100%', margin: '20px 0px 50px 0px' }}>
      <h1>All Buses and Stops</h1>
        <MapView allStops={allStops} addStops={() => {}} />
      </div>  
      <Chart aspect={3} title="petrol consumption" />
      <Table buses={buses} />
      </div>
   
  );
};

export default Home;
