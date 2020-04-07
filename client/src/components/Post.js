import React from 'react'
import { Link } from 'react-router-dom'
import './Post.css'

const Post = ({ post, updatePosts }) => {
    return (
        <div className="post">
            <Link to={`/post/${post.id}`}>
                <h3>{post.title}</h3>
                <p>{post.contents}</p>
            </Link>
        </div>
    )
}

export default Post
