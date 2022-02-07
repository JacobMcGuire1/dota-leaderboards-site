import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Graph from './components/Graph'
import GraphContainer from './components/GraphContainer'
import {getRandomTestData} from './data/testdata'
import {getTopPlayers, decodeData, getPlayerList} from './data/accessapi'
import axios from "axios";

function App() {
  //let data = getData();
  //getTopPlayers.then(res => 
   // )
  
  
  return (
    <div className="App">
      <div>
        <GraphContainer/>
      </div>
    </div>
  );
}

export default App;
