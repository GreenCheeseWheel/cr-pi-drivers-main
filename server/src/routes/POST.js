const postRouter = require('express').Router();
const {postDriver, loginUser, logoutUser} = require('../controllers/postControllers');

postRouter.post('/drivers', (req, res) => {
    const {name, surname, description, image, nationality, birth, teams, userEmail} = req.body;

    postDriver(name, surname, description, image, nationality, birth, teams, userEmail)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).json({error: err.message}))

});

postRouter.post('/login', (req, res) => {
    const {email, password} = req.body;
    loginUser(email, password)
        .then(() => res.status(200).json({logged: true}))
        .catch((err) => res.status(404).json({error: err.message}));
});

postRouter.post('/logout', (req, res) => {
    const {email} = req.body;

    logoutUser(email)
        .then(() => res.status(200).json({logged: false}))
        .catch((err) => res.status(404).json({error: err.message}));

});

module.exports = postRouter;