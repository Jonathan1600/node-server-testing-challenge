const Elements = require("./elements-model");
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    Elements.getAll()
        .then(elements => {
            res.status(200).json(elements);
        })
        .catch(next)
});

router.post("/", (req, res, next) => {
    Elements.insert(req.body)
        .then(element => {
            res.status(201).json(element);
        })
        .catch(next)
});

router.delete("/:element_id", (req, res, next) => {
    const { element_id } = req.params;
    Elements.remove(element_id)
        .then(element => {
            res.status(200).json({
                message: "Great you just deleted a whole element, be aware universe's structure has been compromised thanks to you.",
                dbResponse: element
            });
        })
        .catch(next)
});

router.use((err, req, res, next) => {// eslint-disable-line
    res.status(req.status || 500).json({
        message: "Something went terribly wrong.",
        error: err.message,
        stack: err.stack,
        err: err
    })
})


module.exports = router;