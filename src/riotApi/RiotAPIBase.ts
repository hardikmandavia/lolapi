import axios from "axios";

const API_KEY = 'RGAPI-1824781e-2bc6-412b-824d-71a4322b70ed';

export const API_VER = 'v4';
export const PATCH_VER = '10.10.1';

const CDN_ROOT = 'https://ddragon.leagueoflegends.com/cdn/';

export const getAPI_URL = (
  region: string,
  endpoint: string,
  method: string
): string => {
  return `https://${region}.api.riotgames.com/lol/${endpoint}/${method}`;
};

const HEADERS = {
  Origin: "https://developer.riotgames.com",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  "X-Riot-Token": API_KEY,
  "Accept-Language": "en,en-US;q=0.9,en-GB;q=0.8",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
};

export const riotFetch = (url: string) => {
  return axios.get(url, {
    headers: HEADERS
  });
};

export const riotFetchResponse = (url: string) => {
  return riotFetch(url).then(res => res.data);
}

const RiotAPIBase = {
  API_VER,
  HEADERS,
  getAPI_URL,
  riotFetch
};

export default RiotAPIBase;
