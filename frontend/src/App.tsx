import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph'
import {getRandomTestData} from './data/testdata'

function App() {
  return (
    <div className="App">
      <div className="main">
        <Graph dataset={getRandomTestData(0, 0, 10)}/>
      </div>
    </div>
  );
}

export default App;
