const {Driver, Teams, User} = require('../db');
const axios = require('axios');
const {Op} = require('sequelize');

const DEFAULT_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/1920px-F1.svg.png";

async function getAllDrivers(userEmail)
{
    
    const user = await User.findOne({
        where: {
            email: userEmail
        }
    });

    if(user == null) throw Error("No such user in the database");

    const drivers = (await user.getDrivers()).map(driver => driver.name);

    let drivers_arr = [];

    if(drivers.length)
    {
        drivers_arr = await Driver.findAll({
            where: {
                name: {
                    [Op.or]: drivers
                },
            },
            include: Teams ,
            attributes: {exclude: ['description', 'nationality']}
        });
    }
    
 

    const drivers_arr_api = await axios.get('http://localhost:5000/drivers').then(res => res.data ).catch(error => {return {error: error.message}});
        
    for(const driver of drivers_arr_api)
    {
        // We don't include description nor nationality
        drivers_arr.push({
                id: driver.id,
                name: driver.name.forename,
                surname: driver.name.surname,
                image: driver.image.url.trim() != "" ? driver.image.url : DEFAULT_IMAGE,
                birth: driver.dob,
                teams: driver.teams
        })
    }
    


    return drivers_arr;
    
}

async function getDriverById(id)
{
    let checkUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if(checkUUID.test(id))
    {
        
        let driver = await Driver.findByPk(id, {
            include: Teams,
        });

        if(driver == null) throw Error("No such driver in the database");
        return driver;
    }
    
    let driver = (await axios.get('http://localhost:5000/drivers/' + id)).data;
    driver = {
        nationality: driver.nationality,
        image: driver.image.url ? driver.image.url : DEFAULT_IMAGE,
        name: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        birth: driver.dob,
        Teams: driver.teams
    }

    return driver;
}

async function getDriverByName(name)
{
    try
    {
        let driver = await Driver.findAll({
            where: {
                name: {
                    [Op.iLike]: name,
                }
            },
            include: Teams,
        });
        
        return driver.slice(0, 16);
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