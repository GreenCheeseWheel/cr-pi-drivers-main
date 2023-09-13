import axios from "axios";
import { GET_ALL, GET_ALL_TEAMS, GET_BY_NAME, UPDATE_DRIVERS, UPDATE_SUGGESTED, UPDATE_TEAMS } from "./types";
import { getCookie } from "../cookies/getCookie";

function getAllDrivers()
{
    const email = getCookie("email-drivers");

    return async (dispatch) => {

        try {
            const response = await (await fetch('http://localhost:3001/drivers?email=' + email)).json();
            
            dispatch({type: GET_ALL, payload: response}) ;   
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

function updateDrivers(driver)
{
    return {type: UPDATE_DRIVERS, payload: driver}
}


function getTeams(teams)
{
    return (dispatch) => axios('http://localhost:3001/teams')
        .then(resp => resp.data)
        .then(teams => dispatch({type: GET_ALL_TEAMS, payload: teams}))
        .catch(error => dispatch({type: GET_ALL_TEAMS, payload: []}))
}

function updateSearch(name)
{
    return {type: GET_BY_NAME, payload: name};
}

function updateSuggested(suggested)
{
    return {type: UPDATE_SUGGESTED, payload: suggested};
}

function updateTeams(teams)
{
    return {type: UPDATE_TEAMS, payload: teams};
}


export {
    getAllDrivers, 
    getTeams, 
    updateSearch,
    updateSuggested,
    updateTeams,
    updateDrivers
}