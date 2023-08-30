import { GET_ALL, GET_ALL_TEAMS, UPDATE_SUGGESTED } from "./types";

function getAllDrivers()
{
    return async (dispatch) => {
        try {
            const response = await (await fetch('http://localhost:3001/drivers')).json();
            
            dispatch({type: GET_ALL, payload: response}) ;   
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

function getTeams(teams)
{
    return (dispatch) => fetch('http://localhost:3001/teams')
        .then(resp => resp.json())
        .then(teams => dispatch({type: GET_ALL_TEAMS, payload: teams}))
        .catch(error => dispatch({type: GET_ALL_TEAMS, payload: []}))
}

function updateSuggested(suggested)
{
    return {type: UPDATE_SUGGESTED, payload: suggested};
}



export {getAllDrivers, getTeams, updateSuggested}