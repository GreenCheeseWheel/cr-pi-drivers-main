const express = require("express");
const getRouter = require("./routes/GET");
const postRouter = require("./routes/POST");

const morgan = require("morgan");
const cors = require("cors");
const deleteRouter = require("./routes/DELETE");
const putRouter = require("./routes/PUT");
const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(getRouter);
server.use(postRouter);
server.use(deleteRouter);
server.use(putRouter);


module.exports = server;
