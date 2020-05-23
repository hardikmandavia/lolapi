import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class LeagueEntry {
  @Field()
  leagueId: string;

  @Field()
  summonerId: string;

  @Field()
  summonerName: string;

  @Field()
  queueType: string;

  @Field()
  tier: string;

  @Field()
  rank: string;

  @Field()
  leaguePoints: number;

  @Field()
  wins: number;

  @Field()
  losses: number;

  @Field()
  hotStreak: boolean;

  @Field()
  veteran: boolean;

  @Field()
  freshBlood: boolean;

  @Field()
  inactive: boolean;
}
