const {Driver} = require("../../db");

async function deleteDriver(id)
{
    try 
    {
     
        await Driver.destroy({
            where: {
                id,
            },
        });
    }
    catch(err)
    {
        console.log(err.message);
        return Promise.reject(`Error deleting driver with id '${id}'. Error:  ${err.message}`);
    }
}

module.exports = {
    deleteDriver,
}