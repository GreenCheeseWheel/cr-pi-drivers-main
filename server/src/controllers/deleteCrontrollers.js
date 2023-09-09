const {Driver} = require("../db");

async function deleteDriver(id)
{
    try 
    {
        console.log("Estamos destruyendo el driver");

        await Driver.destroy({
            where: {
                id,
            },
        });
    }
    catch(err)
    {
        console.log("El driver no fue destruido")
        console.log(err.message);
        return Promise.reject(err.message);
    }
}

module.exports = {
    deleteDriver,
}