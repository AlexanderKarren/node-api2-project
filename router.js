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
    let postToDelete = null;
    Blogs.findById(req.params.id).then(response => postToDelete = response[0])
    .catch(error => res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}` }))
    Blogs.remove(req.params.id).then(response => {
        res.status(200).json(postToDelete);
    })
    .catch(error => res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}` }))
    .catch(error => {
        res.status(500).json({ errorMessage: "The post could not be removed"})
    })
})

router.put("/:id", (req, res) => {
    let postToEdit = null;
    Blogs.findById(req.params.id).then(response => postToEdit = {
        ...response[0],
        ...req.body
    })
    .catch(error => res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}` }))
    Blogs.update(req.params.id, req.body).then(response => {
        if (response) res.status(200).json(postToEdit);
        else res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}` });
    })
    .catch(error => res.status(500).json({ errorMessage: "The post could not be modified"}))
})

router.get("/:id/comments", (req, res) => {
    Blogs.findPostComments(req.params.id).then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Could not access database" })
    })
})

router.post("/:id/comments", (req, res) => {
    let commentToInsert = null;
    Blogs.findById(req.params.id).then(findRes => {
        commentToInsert = {
        ...req.body,
        post_id: parseInt(req.params.id),
        }
        Blogs.insertComment(commentToInsert).then(insertRes => {
            console.log(commentToInsert);
            res.status(200).json({
                id: insertRes.id,
                ...commentToInsert,
                post: findRes[0].title
            });
        })
        .catch(error => res.status(500).json({ errorMessage: "Could not access database" }))
    })
    .catch(error => res.status(404).json({ errorMessage: `Could not find post with id ${req.params.id}` }))
})

module.exports = router;