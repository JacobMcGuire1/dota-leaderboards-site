import React, { Component } from 'react';
import { DataPoint } from '../data/types';
import CanvasJSReact from '../lib/canvasjs.react';
import '../App.css';
import {getTopPlayers, decodeData, getPlayerList} from '../data/accessapi'
import Graph from './Graph'
import { getTextOfJSDocComment } from 'typescript';
import { AnyRecord } from 'dns';

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
    private submitOptionsForm() {
        
    }
    private onValueChange(event: any, stateproperty: string) {
        // @ts-ignore
        this.setState({
            [stateproperty]: event.target.value
        });
    }
    private generateRadial(stateproperty: string, value: any, displayname: string) {
        return (
            
            <label>
                    <input type="radio" value={value} checked={
                        // @ts-ignore
                        this.state[stateproperty as any] === value} onChange={(event: any) => this.onValueChange(event, stateproperty)}/>
                    {displayname}
            </label>
        );
    }
    private getOptionsForm() {
        return (
            <form onSubmit={this.submitOptionsForm}>
                {this.generateRadial("region", Region.Europe, "Europe")}
                {this.generateRadial("region", Region.Americas, "Americas")}
                {this.generateRadial("region", Region.SEA, "South East Asia")}
                {this.generateRadial("region", Region.China, "China")}
                {/*<label>
                    <input type="radio" value={Region.Americas} checked={this.state.region === Region.Americas} onChange={(event) => this.onValueChange(event)}/>
                    Americas
                </label>
                <label>
                    <input type="radio" value={Region.Europe} checked={this.state.region === Region.Europe} onChange={(event) => this.onValueChange(event)}/>
                    Europe
                </label>
                <label>
                    <input type="radio" value={Region.SEA} checked={this.state.region === Region.SEA} onChange={(event) => this.onValueChange(event)}/>
                    SE Asia
                </label>
                <label>
                    <input type="radio" value={Region.China} checked={this.state.region === Region.China} onChange={(event) => this.onValueChange(event)}/>
                    China
                </label>
                <button>
                Submit
                </button>*/}
            </form>
        );
    }
    public render() {
        return (
            <div>
                <Graph dataset={[]} datapromise={this.getGraphData()} showdatalist={false}/>
                {this.getOptionsForm()}
            </div>
        );
    }
}

export default GraphContainer;