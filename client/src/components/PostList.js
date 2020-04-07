import React from 'react'
import Post from './Post'
import './PostList.css'

const PostList = ({ posts, updatePosts }) => {
    return (
        <div className="post-list">
            <h2>Articles</h2>
            {posts.map(post => <Post key={post.id} post={post} updatePosts={updatePosts}/>)}
        </div>
    )
}

export default PostList
