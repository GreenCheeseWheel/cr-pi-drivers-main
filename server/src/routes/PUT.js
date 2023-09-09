const { updateDriver } = require('../controllers/putControllers');
const putRouter = require('express').Router();

putRouter.put('/driver', async (req, res) => {
    const driverData = req.body;

    try
    {
        await updateDriver(driverData);
        res.status(200).end();
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }

});

module.exports = putRouter;