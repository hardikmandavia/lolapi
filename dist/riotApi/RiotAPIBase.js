"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.riotFetchResponse = exports.riotFetch = exports.getAPI_URL = exports.PATCH_VER = exports.API_VER = void 0;
const axios_1 = require("axios");
const API_KEY = 'RGAPI-1824781e-2bc6-412b-824d-71a4322b70ed';
exports.API_VER = 'v4';
exports.PATCH_VER = '10.10.1';
const CDN_ROOT = 'https://ddragon.leagueoflegends.com/cdn/';
exports.getAPI_URL = (region, endpoint, method) => {
    return `https://${region}.api.riotgames.com/lol/${endpoint}/${method}`;
};
const HEADERS = {
    Origin: "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": API_KEY,
    "Accept-Language": "en,en-US;q=0.9,en-GB;q=0.8",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
};
exports.riotFetch = (url) => {
    return axios_1.default.get(url, {
        headers: HEADERS
    });
};
exports.riotFetchResponse = (url) => {
    return exports.riotFetch(url).then(res => res.data);
};
const RiotAPIBase = {
    API_VER: exports.API_VER,
    HEADERS,
    getAPI_URL: exports.getAPI_URL,
    riotFetch: exports.riotFetch
};
exports.default = RiotAPIBase;
//# sourceMappingURL=RiotAPIBase.js.map