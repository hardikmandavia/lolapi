"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaguesBySummoner = void 0;
const RiotAPIBase_1 = require("./RiotAPIBase");
const endpoint = `league/v4`;
exports.getLeaguesBySummoner = (region, id) => {
    const method = 'entries/by-summoner';
    const url = `${RiotAPIBase_1.getAPI_URL(region, endpoint, method)}/${id}`;
    return RiotAPIBase_1.riotFetchResponse(`${url}`);
};
//# sourceMappingURL=League.js.map