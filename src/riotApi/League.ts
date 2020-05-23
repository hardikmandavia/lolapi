import { getAPI_URL, riotFetchResponse } from "./RiotAPIBase";

const endpoint = `league/v4`;

export const getLeaguesBySummoner = (region: string, id: string) => {
  const method = 'entries/by-summoner';
  const url = `${getAPI_URL(region, endpoint, method)}/${id}`;
  return riotFetchResponse(`${url}`);
};
