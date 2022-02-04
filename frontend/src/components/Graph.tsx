import React, { Component } from 'react';
import { DataPoint } from '../data/types';
import CanvasJSReact from '../lib/canvasjs.react';
import '../App.css';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//This component will display the dataset passed to it as props

type Props = {
    dataset: DataPoint[];
}

//should probably use props for user control of graph
type State = {

}

class Graph extends React.Component<Props, State>{
    private displayDataList(){
        return (
            <div>
                {
                    this.props.dataset.map(
                        point => 
                        <p>
                            {point.team + ": " + point.playername + " Rank: " + point.rank + " Timestamp: " + point.timestamp}
                        </p>
                    )
                }
            </div>
        );
    }
    private getExampleLines(): any {
        return [{
            type: "line",
            name: "Footfall",
            color: "#369EAD",
            showInLegend: true,
            axisYIndex: 1,
            dataPoints: [
                { x: new Date(2017, 0, 7), y: 85.4 }, 
                { x: new Date(2017, 0, 14), y: 92.7 },
                { x: new Date(2017, 0, 21), y: 64.9 },
                { x: new Date(2017, 0, 28), y: 58.0 },
                { x: new Date(2017, 1, 4), y: 63.4 },
                { x: new Date(2017, 1, 11), y: 69.9 },
                { x: new Date(2017, 1, 18), y: 88.9 },
                { x: new Date(2017, 1, 25), y: 66.3 },
                { x: new Date(2017, 2, 4), y: 82.7 },
                { x: new Date(2017, 2, 11), y: 60.2 },
                { x: new Date(2017, 2, 18), y: 87.3 },
                { x: new Date(2017, 2, 25), y: 98.5 }
            ]}]
    }
    private getLines(): any {
        let linedict = new Map<string, {team: string, playername: string, points: {x: Date, y: number}[]}>();
        this.props.dataset.forEach(
            datapoint => {
                let key = datapoint.team + "." + datapoint.playername;
                if (!linedict.has(key)) {
                    linedict.set(key, {team: datapoint.team, playername: datapoint.playername, points: [{x: new Date(datapoint.timestamp * 1000), y: datapoint.rank}]})
                }
                else {
                    let points = linedict.get(key)?.points;
                    points?.push({x: new Date(datapoint.timestamp * 1000), y: datapoint.rank});
                }
            }
        );
        
        let lines: any = [];

        Array.from(linedict.keys()).forEach(key => {
            lines.push(
                {
                    type: "line",
                    name: key,
                    showInLegend: true,
                    axisYIndex: 1,
                    dataPoints: linedict.get(key)?.points
                }
            );
        });

        return lines;
    }
    public render() {
        const options = {
            title: {
              text: "Graph",
            },
            animationEnabled: true,
            zoomenabled: true,
            backgroundColor: "#282c34",
            data: this.getLines(),
            axisY:[{
                title: "Rank",
                tickColor: "#000000",
                labelFontColor: "#000000",
                titleFontColor: "#000000",
                includeZero: false,
                reversed: true,
                minimum: 1
            }],
            axisX: {
                interval: 1,
                intervalType: "day",
                //valueFormatString: "MMM"
            },
            toolTip: {
                shared: true
            }
        }
        return (
            <div className="main">
                <p>This is the graph component.</p>
                <CanvasJSChart classname="graph" options = {options}
                    /* onRef = {ref => this.chart = ref} */
                />
                {this.displayDataList()}
            </div>
            
        );
    }
}


export default Graph;