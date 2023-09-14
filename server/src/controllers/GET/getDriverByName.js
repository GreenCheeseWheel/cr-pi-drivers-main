const {Op} = require('sequelize');
const {Driver, Team} = require('../../db');


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
            include: Team,
        });
        
        return driver.slice(0, 16);
    }
    catch(error)
    {
        throw new Error(error.message);
    }

}