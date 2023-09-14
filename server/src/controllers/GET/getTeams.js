const {Team} = require('../../db');
const axios = require('axios');

async function getTeams()
{

    try
    {
        let teams_array = await Team.findAll();

        
        if(!teams_array.length)
        {
            // There are 4 null values among the teams.
            let drivers_resp = await axios.get('http://localhost:5000/drivers');
            
            drivers_resp = await drivers_resp.data;
            
            

            // Processing null values and creating teams array
            drivers_resp = drivers_resp.map(driver => driver.teams != null ? driver.teams : 'unknown');
            drivers_resp = drivers_resp.map(team_name => team_name.split(','));
            drivers_resp = drivers_resp.flat(2);
            drivers_resp = drivers_resp.map(name => name.trim());
            drivers_resp = [...(new Set(drivers_resp))];
            
            drivers_resp = drivers_resp.map(name => {return {name}});
            
            await Team.bulkCreate(drivers_resp);
            
            teams_array = drivers_resp;
        }
        

        return teams_array;
    }
    catch(error)
    {
        throw Error(error.message);
    }
}

module.exports = {
    getTeams,
}