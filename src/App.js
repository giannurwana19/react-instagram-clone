import { useEffect, useState } from 'react';
import './App.css';
import { logo } from './assets';
import { db } from './firebase';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => {
          return {
            id: doc.id,
            post: doc.data(),
          };
        })
      );
    });
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} alt="logo" />
      </div>
      <h1>Hello</h1>
      {posts.map(({ post, id }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;

// docs

// get data tanpa id
/*
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => {
          return doc.data();
        })
      );
    });
*/

// dalam hal ini kita get data dengan id
