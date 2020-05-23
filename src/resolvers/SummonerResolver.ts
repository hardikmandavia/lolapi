import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

import LeagueEntry from "../schemas/LeagueEntry";
import MatchList from "../schemas/MatchList";
import Summoner from "../schemas/Summoner";

import { getLeaguesBySummoner } from "../riotApi/League";
import { getMatchListByAccount } from "../riotApi/Matches";
import { getSummonerByName } from "../riotApi/Summoner";

@Resolver(of => Summoner)
export default class {
  @Query(returns => Summoner)
  async fetchSummoner(
    @Arg("region") region: string,
    @Arg("name") name: string
  ) {
    return getSummonerByName(region, name)
      .then((data: Summoner) => ({ ...data, region }))
      .catch(e => console.log(e.message));
  }

  @FieldResolver()
  ranked(@Root() summoner: Summoner) {
    return getLeaguesBySummoner(summoner.region, summoner.id)
      .then((data: LeagueEntry[]) => data)
      .catch(e => console.log(e.message));
  }

  @FieldResolver()
  matchList(@Root() summoner: Summoner) {
    return getMatchListByAccount(summoner.region, summoner.accountId)
      .then((data: MatchList) => {
        const matches = data.matches.map(m => {
          m.region = summoner.region;
          return m;
        });
        return { ...data, matches };
      })
      .catch(e => console.log(e.message));
  }
}
