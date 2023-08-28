const { Op } = require('sequelize');
const {Driver, Teams, drivers_x_teams} = require('../db');

async function postDriver(name, surname, description, image, nationality, birth, teams)
{
    try
    {
        const driver = await Driver.create({name, 
            surname, 
            description, 
            image: image ? image : "https://es.wikipedia.org/wiki/Temporada_2022_de_F%C3%B3rmula_1#/media/Archivo:2022_Formula_One_car_at_the_2021_British_Grand_Prix_(51350002179).jpg", 
            nationality, birth
        });
        
        const teams_arr = teams.split(',').map(team => {name: team});

        const teams_ids = await Teams.findAll({
            where: {
                [Op.or]: teams_arr
            }
        })

        for(let i = 0; i < teams_ids.length; i++)
        {
            await drivers_x_teams.create({DriverId: driver.id, TeamId: teams_ids[i].id });
        }
        return;
    }
    catch(error)
    {
        throw Error(error.message);
    }
    
}

module.exports = {
    postDriver,
}