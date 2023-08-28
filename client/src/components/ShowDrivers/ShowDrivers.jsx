import React from "react"
import DriverCard from "../DriverCard/DriverCard";
import {useDispatch, useSelector} from 'react-redux'
import { getAllDrivers } from "../../redux/actions";

export default function ShowDrivers({page, setPage})
{
    const drivers = useSelector(state => state.suggested);
    const dispatch = useDispatch();
    const numDrivers = 9;

    React.useEffect(() => {
        dispatch(getAllDrivers());
    }, []);
    

    const handleNextPage = () => {
        let scrollTop = false;
        setPage(prev => {
            const update = (prev*numDrivers >= drivers.length + 1 ) ? prev : prev + 1
            if(update !== prev) scrollTop = true;
            return update;
        });

        scrollTop && window.scrollTo(0, 0);
    }

    const handlePreviousPage = () => {
        let scrollTop = false;

        setPage(prev => {
            const update = prev == 1 ? prev : prev -1
            if(update !== prev) scrollTop = true;
            return update;
        });
        
        scrollTop && window.scrollTo(0, 0);
    }
  
    return (
        <div>
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
            <button onClick={handleNextPage} >Next</button>
        </div>
    )
}