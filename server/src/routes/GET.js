const getRouter = require("express").Router();
const {getAllDrivers} = require('../controllers/GET/getAllDrivers');
const {getDriverByName} = require('../controllers/GET/getDriverByName');
const {getDriverById} = require('../controllers/GET/getDriverById');
const {getTeams} = require('../controllers/GET/getTeams');


getRouter.get('/drivers', (req, res) => {
    const {email} = req.query;
    getAllDrivers(email)
        .then(data => res.status(200).json(data))
        .catch(error => {
            console.log(error.message);
            res.status(500).json({error: error.message})
            
        });
    
});

getRouter.get('/drivers/name', (req, res) => {
    const {name} = req.query;

    getDriverByName(name)
        .then(driver => res.status(200).json(driver))
        .catch(err => {
            console.log(err.message);
            res.status(500).json({error: err.message})
        });

});

getRouter.get('/drivers/:idDriver', (req, res) => {
    const {idDriver} = req.params;
    
    getDriverById(idDriver)
        .then(driver => res.status(200).json(driver))
        .catch(err => {
            console.log(err.message);
            res.status(500).json({error: err.message})
        });


});

getRouter.get('/teams', (req, res) => {
    getTeams()
        .then(teams => res.status(200).json(teams))
        .catch(err => {
            console.log(err.message);
            res.status(500).json({error: err.message})
        });
});

module.exports = getRouter;