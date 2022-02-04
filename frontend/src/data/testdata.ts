import {DataPoint} from './types'
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTestData(players: number, teams: number, iterations: number) : DataPoint[] {
    //later choose numbers

    

    let teamlist: string[] = getTeamList(teams);
    let playerlist: string[] = getPlayerList(players);

    //let playerteamlist: [string, string][] = [["NAVI", "Dendi"], ["LIQUID", "MATUMBAMAN"]];

    let playerteamlist: [string, string][] = [];

    playerlist.forEach(
        player => {
            playerteamlist.push([teamlist[Math.floor(Math.random()*teamlist.length)],player]);
        }
    )
    
    let datapoints: DataPoint[] = [];
    
    for (let i = 0; i < iterations; i++){
            let timestamp = ((+ new Date()) - randomInteger(1, 536000000)) / 1000;
            playerteamlist.forEach(player => {
                let datapoint: DataPoint = {
                    team: player[0],
                    playername: player[1],
                    rank: randomInteger(1, 10),
                    timestamp: timestamp
                };
                datapoints.push(datapoint);
        });
    }

    datapoints.sort((a, b) => a.timestamp - b.timestamp);
    
        
    return datapoints;
}

function getTeamList(teamcount: number){
    const config: Config = {
        dictionaries: [adjectives]
    }
      
    let teams = new Set<string>();
    while (teams.size < teamcount) {
        teams.add(uniqueNamesGenerator(config).toUpperCase());
    }

    return Array.from(teams);
}

function getPlayerList(playercount: number){
    const config: Config = {
        dictionaries: [animals]
    }
      
    let players = new Set<string>();
    while (players.size < playercount) {
        players.add(uniqueNamesGenerator(config));
    }

    return Array.from(players);
}

export {getRandomTestData};
