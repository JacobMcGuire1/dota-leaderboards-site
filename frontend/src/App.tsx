import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph'
import {getRandomTestData} from './data/testdata'
import {getTopPlayers, decodeData} from './data/accessapi'
import axios from "axios";

function App() {
  //let data = getData();
  //getTopPlayers.then(res => 
   // )
  
  
  return (
    <div className="App">
      <div>
        <Graph datapromise={getTopPlayers()} dataset={getData()}/>
      </div>
    </div>
  );
}

function getData() {
  //return getTopPlayers();

  return getRandomTestData(5, 5, 100);
}

export default App;
