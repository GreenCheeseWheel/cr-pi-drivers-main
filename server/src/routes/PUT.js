const putRouter = require('express').Router();
const {updateDriver} = require('../controllers/PUT/updateDriver');

putRouter.put('/driver', (req, res) => {
    const driverData = req.body;

    updateDriver(driverData)
        .then(() => res.status(200).end())
        .catch(err => {
            console.error(err.message);
            res.status(500).json({error: err.message});

        })
        
        
});

module.exports = putRouter;