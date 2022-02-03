import React, { Component } from 'react';
import { DataPoint } from '../data/types'

//This component will display the dataset passed to it as props

type Props = {
    dataset: DataPoint[];
}

type State = {

}

class Graph extends React.Component<Props, State>{
    public render() {
        return (
            <div>
                <p>This is the graph component.</p>
                <p>{this.props.dataset.toString()}</p>
            </div>
            
        );
    }
}


export default Graph;