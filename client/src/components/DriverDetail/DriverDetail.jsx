import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import "./index.css"

export default function DriverDetail()
{
    const {name} = useParams();

    const driver = useSelector(state => {
        for(let i = 0; i < state.drivers.length; i++)
        {
            if(`${state.drivers[i].name} ${state.drivers[i].surname}` == name)
            {
                return state.drivers[i];
            }
        }

    });

    return(
        driver && (
        <div id="driver-detail">
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