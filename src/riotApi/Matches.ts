import { getAPI_URL, riotFetchResponse } from './RiotAPIBase';

const endpoint = 'match/v4';

export const getMatchListByAccount = (region: string, accountId: string) => {
  const method = 'matchlists/by-account';
  const url = `${getAPI_URL(region, endpoint, method)}/${accountId}?endIndex=10`;
  return riotFetchResponse(`${url}`);
}

export const getMatchById = (region: string, matchId: number) => {
  const method = 'matches';
  const url = `${getAPI_URL(region, endpoint, method)}/${matchId}`;
  return riotFetchResponse(`${url}`);
}
