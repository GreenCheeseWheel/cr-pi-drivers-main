import { GET_ALL, UPDATE_SUGGESTED } from "./types";

const initial_state = {
    drivers: [],
    suggested: []
}

function reducer(state = initial_state, action)
{
    switch(action.type)
    {
        case GET_ALL:
            return {...state, drivers: [...action.payload], suggested: [...action.payload]}

        case UPDATE_SUGGESTED:
            return {...state, suggested: [...action.payload]}

        default:
            return state;

    }

    
}

export default reducer;