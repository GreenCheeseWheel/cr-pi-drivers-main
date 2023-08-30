import React from "react"
import DriverCard from "../DriverCard/DriverCard";
import {useDispatch, useSelector} from 'react-redux'
import { getAllDrivers } from "../../redux/actions";

// I need to get the teams from the Home component
export default function ShowDrivers({page, setPage, teams})
{
    const drivers = useSelector(state => state.suggested);
    const dispatch = useDispatch();
    const numDrivers = 200;

    React.useEffect(() => {
        dispatch(getAllDrivers());
    }, []);


    const handleNextPage = () => {
        setPage(prev => {
            const update = (prev*numDrivers >= drivers.length + 1 ) ? prev : prev + 1
            if(update !== prev) window.scrollTo(0, 0);
            return update;
        });
    }

    const handlePreviousPage = () => {
        setPage(prev => {
            const update = prev == 1 ? prev : prev -1
            if(update !== prev) window.scrollTo(0, 0);
            return update;
        });   
    }
  
    return (
        <div>
            <select>
                {teams && teams.map(team => <option>{team.name}</option>)}
            </select>
            <select>
                <option>API</option>
                <option>DB</option>
            </select>

            <select>
                <option>Asc. by alphabetic order</option>
                <option>Des. by alphabetic order</option>

                <option>Asc. by birthday</option>
                <option>Des. by birthday</option>
            </select>

            {
                drivers.length && drivers.map((driver, index) =>  {

                    if(index >= (page-1)*numDrivers && index < page*numDrivers)
                    {
                        return <DriverCard 
                                    key={index}
                                    id={driver.id} 
                                    name={`${driver.name} ${driver.surname}`} 
                                    image={driver.image} 
                                    teams={driver.teams} 
                                    />
                    }
                })
            }

            <button onClick={handlePreviousPage} disabled={page == 1 ? true : false} >Previous</button>
            <button onClick={handleNextPage} disabled={page >= drivers.length / numDrivers ? true : false} >Next</button>
        </div>
    )
}