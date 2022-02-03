import {DataPoint} from './types'

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTestData(players: number, teams: number, timestamps: number) : DataPoint[] {
    //later choose numbers

    let playerteamlist: [string, string][] = [["NAVI", "Dendi"], ["LIQUID", "MATUMBAMAN"]];
    
    let datapoints: DataPoint[] = [];
    
    for (let i = 0; i < timestamps; i++){
            playerteamlist.forEach(player => {
                let datapoint: DataPoint = {
                    team: player[0],
                    playername: player[1],
                    rank: randomInteger(1, 10),
                    timestamp: i
                };
                datapoints.push(datapoint);
        });
    }
    
        
    return datapoints;
}

export {getRandomTestData};
