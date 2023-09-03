import React from "react"
import DriverCard from "../DriverCard/DriverCard";
import {useDispatch, useSelector} from 'react-redux'
import { getAllDrivers, updateSuggested } from "../../redux/actions";
import { filterByOrderType, filterByOrigin, filterByTeams } from "./filters";
import './index.css'

export const types = {
    origin_db: 'DB',
    origin_api: 'API',
    asc_birthday: 'Asc. by birthday',
    des_birthday: 'Des. by birthday',
    asc_alphabetic: 'Asc. by alphabetic order',
    des_alphabetic: 'Des. by alphabetic order',
};


// I SHOULD GET THE useRedux HOOK HERE BECAUSE STATE GOT TOO COMPLICATED
export default function ShowDrivers({page, setPage, teams})
{
    const allDrivers = useSelector(state => state.drivers);
    const drivers = useSelector(state => {
    
        return state.suggested
    });
    const dispatch = useDispatch();
    const numDrivers = 9;


    const [filters, setFilters] = React.useState({
        origin: types.origin_api,
        order: types.asc_alphabetic,
        currTeam: 'x'
    });

    const [filteredTeams, setFilteredTeams] = React.useState([]);

    React.useEffect(() => {
        !drivers.length && dispatch(getAllDrivers());
    }, [])    

    React.useEffect(() => {
        updateFiltered();
    }, [filters, filteredTeams]);


    const handleEliminate = (team) => {

        setFilteredTeams(prev => {
            let newFilteredTeams = prev.filter(teamName => teamName !== team);
            return newFilteredTeams;
        });

    }

    const updateFiltered = () => {
        let filtered = filterByOrigin(filters.origin, allDrivers);
        filtered = filterByTeams(filteredTeams, filtered);
        filtered = filterByOrderType(filters.order, filtered);

        dispatch(updateSuggested(filtered));
    }

    const handleFiltering = (filterType, value) => {
        if(filterType == 'TEAMS')
        {
            if(value == 'x') 
            {
                setFilteredTeams([]);
                setFilters(prev => new Object({...prev, currTeam: value}));
                return;
            }

            if(!filteredTeams.includes(value)) 
            {
                setFilteredTeams(prev => [...prev, value]);
                setFilters(prev => new Object({...prev, currTeam: value}));
                return;
            }
        }

        if(filterType == 'ORIGIN')
        {
            setFilters(prev => new Object({...prev, origin: value}));
            return;
        }

        if(filterType == 'ORDER')
        {
            setFilters(prev => new Object({...prev, order: value}))
        }

    }


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
            <div>
                <select value={filters.currTeam} onChange={(ev) => handleFiltering('TEAMS', ev.target.value)}>
                    <option>x</option>
                    {teams && teams.map((team, index) => <option key={index}>{team.name}</option>)}
                </select>
                <select value={filters.origin} onChange={(ev) => handleFiltering('ORIGIN', ev.target.value)}>
                    <option>{types.origin_api}</option>
                    <option>{types.origin_db}</option>
                </select>

                <select value={filters.order} onChange={(ev) => handleFiltering('ORDER', ev.target.value)} >
                    <option>{types.asc_alphabetic}</option>
                    <option>{types.des_alphabetic}</option>

                    <option>{types.asc_birthday}</option>
                    <option>{types.des_birthday}</option>
                </select>
            </div>
            <div>
                {
                    filteredTeams.length && 
                    filteredTeams.map((team, index) =>
                    <>
                        { filteredTeams.includes(team) && 
                            <div key={index}>
                                <div>{team}</div>
                                <div style={{width: '50px', height: '50px', backgroundColor: 'white'}} onClick={() => handleEliminate(team)} className="eliminate"></div>
                            </div>
                        }
                    </>
                    )
                }
            </div>
                
            <div id="driver-display">
            {
                drivers.length && drivers.map((driver, index) =>  {

                    if(index >= (page-1)*numDrivers && index < page*numDrivers)
                    {
                        return <DriverCard 
                                    key={index}
                                    id={driver.id} 
                                    name={`${driver.name} ${driver.surname}`} 
                                    image={driver.image} 
                                    teams={driver.teams ? driver.teams : driver["Teams"]} 
                                    />
                    }
                })
            }
            </div>

            <button onClick={handlePreviousPage} disabled={page == 1 ? true : false} >Previous</button>
            <button onClick={handleNextPage} disabled={page >= drivers.length / numDrivers ? true : false} >Next</button>
        </div>
    )
}