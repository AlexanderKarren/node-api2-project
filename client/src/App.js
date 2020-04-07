import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import ExpandedPost from './components/ExpandedPost'
import Header from './components/Header'
import PostList from './components/PostList'
import './App.css';

function App() {
  const [posts, updatePosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then(response => {
      console.log(response.data);
      updatePosts(response.data);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/post/:id"><ExpandedPost /></Route>
        <Route path="/">
          <PostList posts={posts} updatePosts={updatePosts} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
