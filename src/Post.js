import { Avatar } from '@material-ui/core';
import React from 'react';
import './Post.css';

const Post = ({ username, caption, imageUrl }) => {
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
    </div>
  );
};

export default Post;
