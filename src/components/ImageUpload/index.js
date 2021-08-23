import { Button } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { db, storage } from '../../firebase';
import firebase from 'firebase';
import './ImageUpload.css';

const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, Setimage] = useState(null);

  const handleChange = e => {
    if (e.target.files[0]) {
      Setimage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      snapshot => {
        // progress functon
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      err => {
        // error function
        console.log(err);
        alert(err.message);
      },
      () => {
        // compolete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption('');
            Setimage(null);
          });
      }
    );
  };

  return (
    <div className="image-upload">
      <progress className="image-upload-progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={e => setCaption(e.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default ImageUpload;
