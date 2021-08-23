import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { db } from '../../firebase';
import firebase from 'firebase';
import './Post.css';

const Post = ({ postId, username, user, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = e => {
    e.preventDefault();
    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

  return (
    <div className="post">
      <div className="post-header">
        <Avatar className="post-avatar" alt="username" src="" />
        <h3>{username}</h3>
      </div>

      <img src={imageUrl} className="post-image" alt="" />
      {/* image */}

      <h4 className="post-text">
        <strong>{username}</strong> {caption}
      </h4>
      {/* username + caption */}
      <div className="post-comments">
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form onSubmit={postComment} className="posts-comment-box">
          <input
            type="text"
            className="post-input"
            placeholder="Add a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />

          <button type="submit" className="post-button" disabled={!comment}>
            Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
