import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

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
        <div>
            <p>{driver.id}</p>
            <p>{driver.teams}</p>
            <p>{driver.name} {driver.surname}</p>
            <p>{driver.birth}</p>
            <p>{driver.nationality}</p>
            <p>{driver.description}</p>
            <p>{driver.image}</p>
        </div>
    )
    )
}