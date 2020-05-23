"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummonerByName = void 0;
const RiotAPIBase_1 = require("./RiotAPIBase");
const endpoint = `summoner/v4`;
exports.getSummonerByName = (region, name) => {
    const method = 'summoners/by-name';
    const url = `${RiotAPIBase_1.getAPI_URL(region, endpoint, method)}/${name}`;
    return RiotAPIBase_1.riotFetchResponse(`${url}`);
};
//# sourceMappingURL=Summoner.js.map