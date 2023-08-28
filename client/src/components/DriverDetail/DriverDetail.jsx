import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export default function DriverDetail()
{
    const {name} = useParams();

    const driver = useSelector(state => state.drivers.find(driver => {
        const fullName = name.split(' ');
        const isName = fullName[0] == driver.name;
        const isSurname = fullName[1] == driver.surname;
        return isName && isSurname;  
    }));

    return(
        <div>
            <p>{driver.teams}</p>
            <p>{driver.name} {driver.surname}</p>
            <p>{driver.birth}</p>
            <p>{driver.image}</p>
        </div>
    )
}