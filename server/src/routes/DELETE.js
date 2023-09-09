const { deleteDriver } = require("../controllers/deleteCrontrollers");

const deleteRouter = require("express").Router();

deleteRouter.delete('/driver/:id', (req, res) => {
    const {id} = req.params;

    deleteDriver(id)
    .then(() => res.status(200).end())
    .catch(err => res.status(404).json({error: err.message}));
});

module.exports = deleteRouter;