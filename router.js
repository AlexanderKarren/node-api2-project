const express = require('express');

const Blogs = require('./data/db.js')
const router = express.Router();

router.get("/", (req, res) => {
    Blogs.find().then(response => {
        res.status(200).json(response);
    })
    .catch(error => res.status(500).json({ errorMessage: "Could not access data"}))
});

router.get("/:id", (req, res) => {
    Blogs.findById(req.params.id).then(response => {
        if (response.length > 0) res.status(200).json(response[0]);
        else res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}`})
    })
    .catch(error => res.status(500).json({ errorMessage: "Could not access data" }))
});

router.post("/", (req, res) => {
    Blogs.insert(req.body).then(response => {
        console.log(response);
        const newPost = {
            id: response.id,
            ...req.body
        }
        res.status(201).json(newPost);
    })
    .catch(error => {
        console.log(error);
        if (error.code === "SQLITE_CONSTRAINT") res.status(400).json({ errorMessage: "Please include both 'title' and 'contents' as properties."})
        else res.status(500).json({ errorMessage: "Could not access database" })
    })
})

router.delete("/:id", (req, res) => {
    Blogs.remove(req.params.id).then(response => {

    })
})

module.exports = router;