const {Op} = require('sequelize');
const {User, Team, Driver} = require('../../db');
const {DEFAULT_IMAGE} = require('../resources/images');
const axios = require('axios');


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
            include: Team ,
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
                Teams: driver.teams
        })
    }
    


    return drivers_arr;
    
}

module.exports = {
    getAllDrivers,
}