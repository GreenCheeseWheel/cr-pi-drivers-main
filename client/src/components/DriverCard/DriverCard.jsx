import { useNavigate } from "react-router-dom"
import './index.css'

export default function DriverCard({id, name,image, teams})
{
    const navigate = useNavigate();

    return (
        <div id="driver-card">
            <p onClick={() => navigate('/driver/' + name)} id="driver-name">{name}</p>
            <div id="driver-image-container">
                <img id="driver-image" src={image} title={name} alt="image-not-found"></img>
            </div>
            <p id="driver-teams">{teams}</p>        
        </div>
    )
}