import React, { Component } from 'react';
import { DataPoint } from '../data/types';
import CanvasJSReact from '../lib/canvasjs.react';
import '../App.css';
import {getTopPlayers, decodeData, getPlayerList} from '../data/accessapi'
import Graph from './Graph'
import { getTextOfJSDocComment } from 'typescript';

enum APIMode {
    PlayerList,
    TopN,
}

enum Region {
    Europe = "europe",
    Americas = "americas",
    SEA = "se_asia",
    China = "china",
}

type State = {
    apimode: APIMode;
    region: Region;
    n: number; //probably replace this with bounds for the chosen ranks
}

class GraphContainer extends React.Component<{}, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            apimode: APIMode.TopN,
            region: Region.Europe,
            n: 10,
        }
    }
    private getTopNRanks(){
        return getTopPlayers(10);
    }
    private getPlayerListData(){
        return getPlayerList([["","Saksa"], ["B8","Dendi"]]);
    }
    private getGraphData(){
        switch(this.state.apimode) {
            case APIMode.PlayerList:
                return this.getPlayerListData();
            case APIMode.TopN:
                return this.getTopNRanks();
        }
    }
    public render() {
        return (
            <Graph dataset={[]} datapromise={this.getGraphData()} showdatalist={false}/>
        );
    }
}

export default GraphContainer;