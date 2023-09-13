import { GET_ALL, GET_ALL_TEAMS, GET_BY_NAME, UPDATE_DRIVERS, UPDATE_ORDER, UPDATE_ORIGIN, UPDATE_SUGGESTED, UPDATE_TEAMS } from "./types";

const initial_state = {
    drivers: [],
    suggested: [],
    teams: [],
    name: "",
    originFilter: 'ANY',
    orderFilter: 'Asc. by birthday',
    teamsFilter: [],
}

function reducer(state = initial_state, action)
{
    switch(action.type)
    {
        case GET_ALL:
            return {...state, drivers: [...action.payload], suggested: [...action.payload]}

        case UPDATE_SUGGESTED:
            return {...state, suggested: [...action.payload]}
        
        case UPDATE_DRIVERS:
            return {...state, drivers: [...state.drivers, action.payload]}
        
        case GET_ALL_TEAMS:
            return {...state, teams: [...action.payload]}

        case GET_BY_NAME:
            return {...state, name: action.payload};
        
        case UPDATE_ORIGIN:
            return {...state, originFilter: action.payload};

        case UPDATE_ORDER:
            return {...state, orderFilter: action.payload};

        case UPDATE_TEAMS:
            return {...state, teamsFilter: action.payload};

        default:
            return state;

    }

    
}

export default reducer;