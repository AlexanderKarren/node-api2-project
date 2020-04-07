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

module.exports = router;