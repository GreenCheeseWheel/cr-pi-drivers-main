import React from "react"
import DriverCard from "../DriverCard/DriverCard";
import {useDispatch, useSelector} from 'react-redux'
import { getAllDrivers, updateSuggested, updateTeams } from "../../redux/actions";
import { filterByName, filterByOrderType, filterByOrigin, filterByTeams } from "./filters";
import './index.css'
import { UPDATE_TEAMS } from "../../redux/types";

export const types = {
    origin_any: 'ANY',
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
    const search = useSelector(state => state.name);
    const originFilter = useSelector(state => state.originFilter);
    const orderFilter = useSelector(state => state.orderFilter);
    const teamsFilter = useSelector(state => state.teamsFilter);

    const drivers = useSelector(state => {
        return state.suggested
    });

    const dispatch = useDispatch();
    const numDrivers = 9;

    
    React.useEffect(() => {
        if(!drivers.length) {
            dispatch(getAllDrivers());
        }
        
    }, [])    


    React.useEffect(() => {
        updateFiltered();
    }, [originFilter, teamsFilter, orderFilter, search]);


    const handleEliminate = (team) => {
        dispatch(updateTeams(teamsFilter.filter(teamName => teamName !== team)))
    }

    const updateFiltered = () => {
        let filtered = filterByName(search, allDrivers);
        filtered = filterByOrigin(originFilter, filtered);
        filtered = filterByTeams(teamsFilter, filtered);
        filtered = filterByOrderType(orderFilter, filtered);

        dispatch(updateSuggested(filtered));
        setPage(1);

    }

    const handleFiltering = (filterType, value) => {
        if(filterType == 'TEAMS')
        {
            if(value == 'Any team') 
            {
                dispatch(updateTeams([]));
              
                return;
            }

            if(!teamsFilter.includes(value)) 
            {
                dispatch(updateTeams([...teamsFilter,value]));
                return;
            }
        }

        if(filterType == 'ORIGIN')
        {
            
            if(value == "Any origin")
            {
                dispatch({type: "UPDATE_ORIGIN", payload: "ANY"});
            }
        
            dispatch({type: "UPDATE_ORIGIN", payload: value})
            
            return;
        }

        if(filterType == 'ORDER')
        {
            dispatch({type: "UPDATE_ORDER", payload: value})
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
        <div id="drivers-container">
            <div id="filters-container">
                <select id="teams-select" value={[...teamsFilter].pop()} onChange={(ev) => handleFiltering('TEAMS', ev.target.value)}>
                    <option>Any team</option>
                    {teams && teams.map((team, index) => <option key={index}>{team.name}</option>)}
                </select>

                <select id="origin-select" value={originFilter} onChange={(ev) => handleFiltering('ORIGIN', ev.target.value)}>
                    <option>Any origin</option>
                    <option>{types.origin_api}</option>
                    <option>{types.origin_db}</option>
                </select>

                <select id="ordering-select" value={orderFilter} onChange={(ev) => handleFiltering('ORDER', ev.target.value)} >
                    <option>{types.asc_alphabetic}</option>
                    <option>{types.des_alphabetic}</option>

                    <option>{types.asc_birthday}</option>
                    <option>{types.des_birthday}</option>
                </select>
            </div>

            <div>
                {
                    teamsFilter.length ?
                        teamsFilter.map((team, index) =>
                        <>
                            { teamsFilter.includes(team) && 
                                <div key={index}>
                                    <div key={team}>{team}</div>
                                    <div key={team + index} style={{width: '50px', height: '50px', backgroundColor: 'white'}} onClick={() => handleEliminate(team)} className="eliminate"></div>
                                </div>
                            }
                        </>
                    )
                    :
                    <></>
                    
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