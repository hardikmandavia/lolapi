import { getAPI_URL, riotFetchResponse }  from './RiotAPIBase';

const endpoint = `summoner/v4`;

export const getSummonerByName = (region: string, name: string) => {
  const method = 'summoners/by-name';
  const url = `${getAPI_URL(region, endpoint, method)}/${name}`;
  return riotFetchResponse(`${url}`);
};
