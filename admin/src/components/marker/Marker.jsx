import './Marker.scss'

const Marker = ({stop, onClick}) => {
    return (
        <div className='marker' onClick={() => onClick(stop)}>
            <h5>{stop.name}</h5>
        </div>

    )
}

export default Marker