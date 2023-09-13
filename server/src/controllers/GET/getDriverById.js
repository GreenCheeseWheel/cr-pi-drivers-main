const {Driver, Teams} = require('../../db');
const {DEFAULT_IMAGE} = require('../resources/images');
const axios = require('axios');

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

module.exports = {
    getDriverById,
}