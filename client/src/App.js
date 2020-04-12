import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { API_URL } from './constants';
import { DropzoneArea } from 'material-ui-dropzone';
import { Button } from '@material-ui/core';

function App() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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
  const fileChangeHandler = (files) => {
    setSelectedFile(files[0]);
  };

  const uploadHandler = () => {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    axios
      .post(`${API_URL}/upload`, formData)
      .then((res) => {
        setImages([...images, res.data]);
        setSelectedFile(null);
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
      <div style={{ display: 'inline-block', width: 500, margin: 20 }}>
        <DropzoneArea
          showAlerts={false}
          filesLimit={1}
          onChange={fileChangeHandler}
        />
      </div>
      {/* <div>
        {file && (
          <button
            onClick={uploadHandler}
            style={{
              display: 'inline-block',
              width: 500,
              padding: 10,
              fontSize: 16,
              cursor: 'pointer',
            }}>
            Upload
          </button>
        )}
      </div> */}
      <div>
        {selectedFile && (
          <Button variant="contained" onClick={uploadHandler}>
            Upload
          </Button>
        )}
      </div>
      <div>{imageList}</div>
    </div>
  );
}

export default App;
