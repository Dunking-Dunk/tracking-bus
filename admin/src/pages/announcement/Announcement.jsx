import './announcement.scss'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getAllAnnouncement } from '../../store/action'

const Announcement = () => {
    const announcements = useSelector((state)=> state.announcements.announcements)
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAllAnnouncement())
    }, [])

    return (
 
        <div className="announcement__container">
            <h1 className='announcement__title'>Announcement</h1>
            <div className='announcement__create__container'>
                <h3>Create Announcement</h3>
                <Link className='announcement__create__container-btn' to='/announcement/new'>Add announcement</Link>
            </div>
            <div className='announcement__content__container'>
                
            </div>
        </div>
    )
}

export default Announcement