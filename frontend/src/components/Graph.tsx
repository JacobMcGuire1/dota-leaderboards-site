import React, { Component } from 'react';
import { DataPoint } from '../data/types'

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
    public render() {
        return (
            <div>
                <p>This is the graph component.</p>
                {this.displayDataList()}
            </div>
            
        );
    }
}


export default Graph;