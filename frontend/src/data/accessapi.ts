import axios from "axios";
import {DataPoint} from './types'


function getTopPlayers(count: number, region: string) {
    return axios.get("/graph/top?count=" + count.toString() + "&region=" + region);/*.then((res) => {
        return decodeData(res.data);
      })
      .catch((err) => console.log(err));*/

}

function getPlayerList(players: [string, string][], region: string) {
    let playerjson = JSON.stringify(players);
    return axios.get("/graph/players?list=" + playerjson + "&region=" + region);/*.then((res) => {
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

export {getTopPlayers, decodeData, getPlayerList}