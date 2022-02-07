import React, { Component } from 'react';
import { DataPoint } from '../data/types';
import CanvasJSReact from '../lib/canvasjs.react';
import '../App.css';
import {getTopPlayers, decodeData, getPlayerList} from '../data/accessapi'
import Graph from './Graph'
import { getTextOfJSDocComment } from 'typescript';
import { AnyRecord } from 'dns';

enum APIMode {
    PlayerList = "0",
    TopN = "1",
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
        return getTopPlayers(this.state.n, this.state.region);
    }
    private getPlayerListData(){
        return getPlayerList([["","Saksa"], ["B8","Dendi"]], this.state.region);
    }
    
    private submitOptionsForm() {
        
    }

    //converts type to string (BAD)
    private onValueChange(event: any, stateproperty: string) {

        let value = event.target.value;

        // @ts-ignore
        this.setState({
            [stateproperty]: value
        });
    }
    private generateRadial(stateproperty: string, value: any, displayname: string) {
        return (
            <label>
                <input type="radio" value={value} checked={
                    // @ts-ignore
                    this.state[stateproperty] == value} onChange={(event: any) => this.onValueChange(event, stateproperty)}/>
                {displayname}
            </label>
        );
    }
    private getAPISpecificForm(){
        switch(this.state.apimode) {
            case APIMode.PlayerList:
                return (
                    <label>

                    </label>
                );
            case APIMode.TopN:
                return (
                    <label>
                        <input type="number" value={this.state.n} onChange={(event: any) => this.setState({n: event.target.value})}/>
                        Number of Players: 
                    </label>
                );
        }
    }
    private getGraphData(){
        switch(this.state.apimode) {
            case APIMode.PlayerList:
                return this.getPlayerListData();
            case APIMode.TopN:
                return this.getTopNRanks();
        }
    }
    private getOptionsForm() {
        return (
            <form onSubmit={this.submitOptionsForm}>
                {this.generateRadial("region", Region.Europe, "Europe")}
                {this.generateRadial("region", Region.Americas, "Americas")}
                {this.generateRadial("region", Region.SEA, "South East Asia")}
                {this.generateRadial("region", Region.China, "China")}

                <br/>

                {this.generateRadial("apimode", APIMode.PlayerList, "Chosen Players")}
                {this.generateRadial("apimode", APIMode.TopN, "Top N Players")}

                <br/>

                {this.getAPISpecificForm()}
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