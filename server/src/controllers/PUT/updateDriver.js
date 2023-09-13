const {Driver, Teams, drivers_x_teams} = require('../../db');

async function updateDriver({id, name, surname, teams, description})
{
   
    await Driver.update({name, surname, description}, {
        where: {
            id,
        },
    });

    if(teams && teams.trim())
    {
        let teams_arr = teams.split(',');
        let teamsIds = [];

        for(const team of teams_arr)
        {
            const [teamFromDb, created] = await Teams.findOrCreate({
                where: {
                    name: team.trim(),
                }
            });

            teamsIds.push(teamFromDb.id);
        }
        
        for(const teamId of teamsIds)
        {
            await drivers_x_teams.findOrCreate({
                where: {
                    DriverId: id, 
                    TeamId: teamId 
                },
            });
        }

    }

}

module.exports = {
    updateDriver,
}