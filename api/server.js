const express = require("express");
const server = express();
const elementsRouter = require("./elements/elements-router")

server.use(express.json());

server.use("/api/elements", elementsRouter);

server.use("*", (req, res) => {
    res.status(404).json({ message: "wrong URL" });
});

module.exports = server;