import { Routes, Route } from "react-router-dom";
import './Main.scss'
import { useEffect } from "react";
import { getAllGpsTracker, getAllStop } from "../store/action";
import { useDispatch } from "react-redux";

import StopNew from "./stop/StopNew";
import BusNew from "./bus/BusNew";
import Home from "./home/Home";
import Bus from "./bus/bus";
import Stop from "./stop/stop";
import Single from "./single/Single";
import Sidebar from "../components/sidebar/Sidebar";
import CreateAnnouncement from "./announcement/CreateAnnouncement";
import Announcement from './announcement/Announcement'

const Main = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllStop())
    dispatch(getAllGpsTracker())
  })

    return (
        <div className='main'>
            <Sidebar />
            <div className="main__container">
            <Routes>
            <Route index element={<Home />} />
            <Route path="bus">
              <Route index element={<Bus />} />
              <Route path="edit/:busId" element={<BusNew update={true} />} />
              <Route path="new" element={<BusNew />} />
            </Route>
            <Route path="stop">
              <Route index element={<Stop />} />
              <Route path=":stopId" element={<Single />} />
              <Route path="new" element={<StopNew />} />
            </Route>
            <Route path="announcement">
              <Route index element={<Announcement/>} />
              <Route path="new" element={<CreateAnnouncement/>} />
            </Route>
         
        </Routes>
            </div>
  
        </div>

    )

}

export default Main