const postRouter = require('express').Router();
const {postDriver} = require('../controllers/postControllers');

postRouter.post('/drivers', (req, res) => {
    const {name, surname, description, image, nationality, birth, teams} = req.body;

    postDriver(name, surname, description, image, nationality, birth, teams)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).json({error: err.message}))

});

module.exports = postRouter;