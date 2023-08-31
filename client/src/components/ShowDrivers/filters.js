import { types } from "./ShowDrivers";

function filterByOrigin(origin, drivers)
{

    if(drivers)
    {
        switch(origin)
        {
            case types.origin_db:
                return drivers.filter(driver => driver.origin != null);

            case types.origin_api:
                return drivers.filter(driver => driver.origin == null);
        }

    }
}

function filterByTeams(teamsArr, drivers)
{
    if(!teamsArr.length) return drivers;

    
    const filteredDrivers = drivers.filter(driver => {
        
        if(driver.teams != null)
        {    
            const driverTeams = driver.teams.split(',').map(teamName => teamName.trim());

            for(let i = 0; i < teamsArr.length; i++)
            {

                if(!driverTeams.includes(teamsArr[i]))
                {
                    return false;
                }
            }

            return true;
        }
        
        return false;
    })

    return filteredDrivers; 

}

function filterByOrderType(order, drivers)
{
    let ordered = [...drivers];

    switch(order)
    {
        case types.asc_alphabetic:
           
            ordered.sort((driverA, driverB) => {
                if(driverA.name > driverB.name) return 1;
                if(driverB.name > driverA.name) return -1;
                return 0;
            });
            break;

        case types.des_alphabetic:
            ordered.sort((driverA, driverB) => {
                if(driverA.name > driverB.name) return -1;
                if(driverB.name > driverA.name) return 1;
                return 0;
            });
            break;    


        case types.asc_birthday:
            ordered.sort((driverA, driverB) => {
                if(driverA.birth > driverB.birth) return 1;
                if(driverB.birth > driverA.birth) return -1;
                return 0;
            });
            break;
        
        case types.asc_birthday:
            ordered.sort((driverA, driverB) => {
                if(driverA.birth > driverB.birth) return -1;
                if(driverB.birth > driverA.birth) return 1;
                return 0;
            });
            break;
    }

    return ordered;    
}



export {
    filterByOrigin,
    filterByOrderType,
    filterByTeams
}