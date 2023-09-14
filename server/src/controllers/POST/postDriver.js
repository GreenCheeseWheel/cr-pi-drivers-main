const {Driver, Team, users_x_drivers, drivers_x_teams} = require('../../db');


async function postDriver(name, surname, description, image, nationality, birth, teams, userEmail)
{
    try
    {
        const driver = await Driver.create({name, 
            surname, 
            description, 
            image, 
            nationality, birth,
            origin: 'db'
        });
        
        
        const teams_arr = teams.split(',').map(team => new Object({name: team.trim()}));
        const teams_resp = [];
        
        for(const team of teams_arr)
        {
            const [teamFromDb, created] = await Team.findOrCreate({
                where: {
                    name: team.name
                }
            });
            
            teams_resp.push(teamFromDb);
        }

        
        await driver.addTeams(teams_resp);

        /*
        for(let i = 0; i < teams_resp.length; i++)
        {
            await drivers_x_teams.create({DriverId: driver.id, TeamId: teams_resp[i].id });
        }
        */
        await users_x_drivers.create({DriverId: driver.id, UserEmail: userEmail});

        return {...driver, Teams: teams};
    }
    catch(error)
    {
        throw Error(error.message);
    }
    
}

module.exports = {
    postDriver,
}