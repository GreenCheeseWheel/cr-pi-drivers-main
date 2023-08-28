import { GET_ALL, UPDATE_SUGGESTED } from "./types";

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

function updateSuggested(suggested)
{
    return {type: UPDATE_SUGGESTED, payload: suggested};
}


export {getAllDrivers, updateSuggested}