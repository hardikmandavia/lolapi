import { Field, ObjectType } from "type-graphql";

import Champion from "./Champion";
import Match from "./Match";
import Queue from "./Queue";

@ObjectType()
export default class MatchReference {
  @Field()
  gameId: number;

  @Field(type => Match)
  gameDetails: Match;

  @Field()
  role: string;

  @Field()
  season: number;

  @Field()
  platformId: string;

  @Field()
  champion: number;

  @Field(type => Champion, { nullable: true })
  championDetails: Champion;

  @Field()
  queue: number;

  @Field(type => Queue, { nullable: true })
  queueDetails: Queue;

  @Field()
  lane: string;

  @Field()
  timestamp: number;

  @Field()
  region: string;
}
