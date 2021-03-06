import React, { Component } from 'react';
import { DataPoint } from '../data/types';
import CanvasJSReact from '../lib/canvasjs.react';
import '../App.css';
import {decodeData} from '../data/accessapi'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//This component will display the dataset passed to it as props

type Props = {
    dataset: DataPoint[];
    datapromise: any;
    showdatalist: boolean;
}

//should probably use props for user control of graph
type State = {
    dataset: DataPoint[];
}

class Graph extends React.Component<Props, State>{
    chartRef: React.RefObject<any>;
    constructor(props: Props) {
        super(props)
        this.state ={
            dataset: []
        }
        this.chartRef = React.createRef();
    }
    private displayDataList(){
        if (this.props.showdatalist) return (
            <div>
                {
                    this.state.dataset.map(
                        point => 
                        <p>
                            {point.team + "." + point.playername + " Rank: " + point.rank + " Timestamp: " + point.timestamp}
                        </p>
                    )
                }
            </div>
        );
        return (
            <div></div>
        );

        
    }
    componentDidMount() {
        this.props.datapromise.then((res: any) => {
            this.setState({
                dataset: decodeData(res.data)
            })
            this.chartRef.current!.render();
        }).catch((err: any) => console.log(err));
    }
    
    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevProps.datapromise !== this.props.datapromise){
            this.props.datapromise.then((res: any) => {
                this.setState({
                    dataset: decodeData(res.data)
                })
            }).catch((err: any) => console.log(err));
        }
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
        this.state.dataset.forEach(
            datapoint => {
                let key = (datapoint.team === "" ? "" : datapoint.team + ".") + datapoint.playername;
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
              text: "",
              fontColor: "white"
            },
            theme: "light2",
            animationEnabled: true,
            zoomEnabled: true,
            data: this.getLines(),
            axisY:[{
                title: "Rank",
                includeZero: false,
                reversed: true,
                //minimum: 1
            }],
            axisX: {
                interval: 1,
                intervalType: "day",
                //valueFormatString: "MMM"
            },
            legend: {
            },
            toolTip: {
                shared: true,
                reversed: true
            }
        }
        const containerProps = {
            height: "calc(100vh - 150px)",
            width: "calc(100vw - 150px)",
            margin: 10,
          };
        console.log("Drawing graph");
        return (
            <div className="main">
                <CanvasJSChart onRef={(ref: any) => this.chartRef = ref} containerProps={containerProps} classname="graph" options = {options}
                    /* onRef = {ref => this.chart = ref} */
                />
                {this.displayDataList()}
            </div>
            
        );
    }
}


export default Graph;