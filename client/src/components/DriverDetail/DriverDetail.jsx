import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import "./index.css"
import axios from "axios";

export default function DriverDetail()
{
    const {name} = useParams();
    const navigate = useNavigate();

    const driver = useSelector(state => {
        for(let i = 0; i < state.drivers.length; i++)
        {
            if(`${state.drivers[i].name} ${state.drivers[i].surname}` == name)
            {
                return state.drivers[i];
            }
        }

    });

    const handleDelete = () => {
        axios
            .delete(`http://localhost:3001/driver/${driver.id}`)
            .then(() => navigate('/home'))
            .catch(err => alert(err.message));
    };

    const handleUpdate = () => {
        navigate(`/update/${driver.id}`);
    }

    return(
        driver && (
        <div id="driver-detail">
            {
                driver["Teams"] && (
                <div>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                )
            }
            <p>{driver.id}</p>
            <p>{driver.teams ? driver.teams : driver["Teams"].map(team => team.name).join(', ') }</p>
            <p>{driver.name} {driver.surname}</p>
            <img src={driver.image} />
            <p>{driver.birth}</p>
            <p>{driver.nationality}</p>
            <p>{driver.description}</p>
            
        </div>
    )
    )
}