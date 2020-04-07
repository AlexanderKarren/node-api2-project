const express = require('express');
const cors = require('cors');

const blogsRouter = require('./router.js')

const server = express();

server.use(express.json());
server.use(cors())
server.use('/api/posts', blogsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>Node API Project 2</h1>
        <h2>Blog Posts and Comments</h2>
    `)
})

server.listen(5000, () => console.log(`server listening on port 5000`))