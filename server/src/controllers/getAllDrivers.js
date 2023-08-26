const {Driver} = require('../db');

async function getAllDrivers()
{
    let drivers_arr = await Driver.findAll();

    // We check if database has any drivers at all
    // Only possibilities are either the db has ALL drivers or NONE
    // If NONE we retrieve from the API and fill the db

    if(!drivers_arr.length)
    {

    }

    return drivers_arr;
}

module.exports = getAllDrivers;