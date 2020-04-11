import React from 'react';
import './App.css';

function App() {
  const fileChangeHandler = (e) => {
    console.log(e.target.files);
  };

  return (
    <div className="App">
      <input type="file" onChange={fileChangeHandler}></input>
    </div>
  );
}

export default App;
