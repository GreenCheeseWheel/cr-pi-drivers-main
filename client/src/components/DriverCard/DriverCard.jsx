import { useNavigate } from "react-router-dom"

export default function DriverCard({id, name,image, teams})
{
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate('/driver/' + name)}>
            <p>{name}</p>
            <img width="150" src={image} title={name} alt="driver"></img>
            <p>{teams}</p>        
        </div>
    )
}