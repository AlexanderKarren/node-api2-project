import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './ExpandedPost.css'

const ExpandedPost = () => {
    const { id } = useParams();
    const [post, updatePost] = useState({});
    const [comments, updateComments] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`).then(response => {
            console.log(response);
            updatePost(response.data);
            axios.get(`http://localhost:5000/api/posts/${id}/comments`).then(response => {
                console.log(response);
                updateComments(response.data);
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }, [id])

    return (
        <div className="expanded-post">
            <p><Link to="/">return</Link></p>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
            <h3>Comments</h3>
            {comments.map(comment => <p key={comment.id}><span>User{comment.id}</span>{comment.text}</p>)}
        </div>
    )
}

export default ExpandedPost
