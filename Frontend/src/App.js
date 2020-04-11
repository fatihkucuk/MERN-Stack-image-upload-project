import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);

  const fileChangeHandler = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const uploadHandler = () => {
    const formData = new FormData();
    formData.append('image', file, file.name);
    axios
      .post('http://localhost:3000/api/v1/upload', formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <input type="file" onChange={fileChangeHandler}></input>
      {file && <button onClick={uploadHandler}>Upload</button>}
    </div>
  );
}

export default App;
