import axios from "axios";
import {DataPoint} from './types'

function getTopPlayers() {
    return axios.get("/graph/");/*.then((res) => {
        return decodeData(res.data);
      })
      .catch((err) => console.log(err));*/

}

function decodeData(data: any) {
    let datalist: [number, string, number, string, string][] = JSON.parse(data);

    let datapoints: DataPoint[] = [];

    datalist.forEach(player => {
        let datapoint: DataPoint = {
            team: player[3],
            playername: player[4],
            rank: player[2],
            timestamp: player[0]
        };
        datapoints.push(datapoint);
    });
    return datapoints!;        
}

export {getTopPlayers, decodeData}