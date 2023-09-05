import { GET_ALL, GET_ALL_TEAMS, GET_BY_NAME, UPDATE_SUGGESTED } from "./types";

const initial_state = {
    drivers: [],
    suggested: [],
    teams: [],
    name: ""
}

function reducer(state = initial_state, action)
{
    switch(action.type)
    {
        case GET_ALL:
            return {...state, drivers: [...action.payload], suggested: [...action.payload]}

        case UPDATE_SUGGESTED:
            return {...state, suggested: [...action.payload]}
        case GET_ALL_TEAMS:
            return {...state, teams: [...action.payload]}
        case GET_BY_NAME:
            return {...state, name: action.payload};

        default:
            return state;

    }

    
}

export default reducer;