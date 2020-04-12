import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadHandler = () => {
    const formData = new FormData();
    formData.append('image', file, file.name);
    axios
      .post('http://localhost:3000/api/v1/upload', formData)
      .then((res) => {
        setImagePath(`http://localhost:3000/api/v1/${res.data.path}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <input type="file" onChange={fileChangeHandler}></input>
      {file && <button onClick={uploadHandler}>Upload</button>}
      {imagePath && (
        <div>
          <img
            src={imagePath}
            style={{ width: 200, height: 200, marginTop: 20 }}></img>
        </div>
      )}
    </div>
  );
}

export default App;
