const {Driver, Teams} = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');

async function getAllDrivers()
{
    try
    {   
        const drivers_arr = await Driver.findAll({include: Teams});


        const drivers_arr_api = await axios.get('http://localhost:5000/drivers').then(res => res.data ).catch(error => {return {error: error.message}});
        
        for(const driver of drivers_arr_api)
        {
            drivers_arr.push({
                id: driver.id,
                name: driver.name.forename,
                surname: driver.name.surname,
                description: driver.description,
                image: driver.image.url ? driver.image.url : "https://es.wikipedia.org/wiki/Temporada_2022_de_F%C3%B3rmula_1#/media/Archivo:2022_Formula_One_car_at_the_2021_British_Grand_Prix_(51350002179).jpg",
                nationality: driver.nationality,
                birth: driver.dob,
                teams: driver.teams
            })
        }
    


        return drivers_arr;
    }
    catch(error)
    {
        throw Error(error.message)
    }
    
}

async function getDriverById(id)
{
    try
    {

        let driver = await Driver.findByPk(id, {
            include: Teams,
        });

        if(driver) return driver;
        return (await axios.get('http://localhost:5000/drivers/' + id)).data;

    }
    catch(error)
    {
        throw Error(error.message);
    }
}

async function getDriverByName(name)
{
    try
    {
        let driver = await Driver.findOne({
            where: {
                name: {
                    [Op.iLike]: name,
                }
            },
            include: Teams,
        });
        
        return driver;
    }
    catch(error)
    {
        throw new Error(error.message);
    }

}

async function getTeams()
{

    try
    {
        let teams_array = await Teams.findAll();

        
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
            
            await Teams.bulkCreate(drivers_resp);

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
    getAllDrivers,
    getDriverById,
    getDriverByName,
    getTeams
};