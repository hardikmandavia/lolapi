import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class TeamStats {
  @Field()
  towerKills: number;

  @Field()
  riftHeraldKills: number;

  @Field()
  firstBlood: boolean;

  @Field()
  inhibitorKills: number;

  // @Field(type => [TeamBans])
  // bans:	TeamBans[];

  @Field()
  firstBaron: boolean;

  @Field()
  firstDragon: boolean;

  @Field()
  dominionVictoryScore: number;

  @Field()
  dragonKills: number;

  @Field()
  baronKills: number;

  @Field()
  firstInhibitor: boolean;

  @Field()
  firstTower: boolean;

  @Field()
  vilemawKills: number;

  @Field()
  firstRiftHerald: boolean;

  @Field()
  teamId: number;

  @Field()
  win: string;
}
