import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph'
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
        <Graph datapromise={getAPIData()} dataset={getTestData()}/>
      </div>
    </div>
  );
}

function getTestData() {
  //return getTopPlayers();

  return getRandomTestData(5, 5, 100);
}

function getAPIData() {
  return getTopPlayers(20);

  //return getPlayerList([["","Dendi"], ["","S4"]]);
}

export default App;
