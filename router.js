const express = require('express');

const Blogs = require('./data/db.js')
const router = express.Router();

router.get("/", (req, res) => {
    Blogs.find().then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Could not access data"})
    })
});

router.get("/:id", (req, res) => {
    Blogs.findById(req.params.id).then(response => {
        if (response.length > 0) res.status(200).json(response);
        else res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}`})
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Could not access data"})
    })
});

module.exports = router;