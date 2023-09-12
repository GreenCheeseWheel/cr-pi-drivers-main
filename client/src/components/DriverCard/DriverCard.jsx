import { useNavigate } from "react-router-dom"
import './index.css'
import React from "react";

export default function DriverCard({id, name,image, teams})
{
    const navigate = useNavigate();

    return (
        <div id="driver-card-container">
            <div onClick={() => navigate('/driver/' + id)} id="driver-card">
                <span id="driver-name">{name}</span>
                <div id="driver-image-container">
                    <img id="driver-image" src={image} title={name} alt="image-not-found"></img>
                </div>

                {
                    Array.isArray(teams) ?
                    <p id="driver-teams">{teams.map(team => team.name).join(', ')}</p>
                    :
                    <p id="driver-teams">{teams}</p>
                }
            </div>        
        </div>
    )
}