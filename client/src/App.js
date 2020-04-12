import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { API_URL } from './constants';

function App() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    axios
      .get(`${API_URL}/upload`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => alert(err));
  };
  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = () => {
    const formData = new FormData();
    formData.append('image', file, file.name);
    axios
      .post(`${API_URL}/upload`, formData)
      .then((res) => {
        setImagePath(`${res.data.path}`);
        setImages([...images, res.data]);
      })
      .catch((err) => console.log(err));
  };

  const imageList =
    images &&
    images.length > 0 &&
    images.map((image) => {
      return (
        <img
          key={image._id}
          src={image.path}
          style={{ width: 200, height: 200, margin: 20 }}></img>
      );
    });

  return (
    <div className="App">
      <input type="file" onChange={fileChangeHandler}></input>
      {file && <button onClick={uploadHandler}>Upload</button>}
      <div>{imageList}</div>
    </div>
  );
}

export default App;
