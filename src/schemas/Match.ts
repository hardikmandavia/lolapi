import { Field, ObjectType } from "type-graphql";

import Participant from "./Participant";
import ParticipantIdentity from "./ParticipantIdentity";
import TeamStats from "./TeamStats";

@ObjectType()
export default class Match {
  @Field()
  gameId: number;

  @Field(type => [Participant])
  participants: Participant[];

  @Field(type => [ParticipantIdentity])
  participantIdentities: ParticipantIdentity[];

  @Field()
  queueId: number;

  @Field()
  gameType: string;

  @Field()
  gameDuration: number;

  @Field(type => [TeamStats])
  teams: TeamStats[];

  @Field()
  platformId: string;

  @Field()
  gameCreation: number;

  @Field()
  seasonId: number;

  @Field()
  gameVersion: string;

  @Field()
  mapId: number;

  @Field()
  gameMode: string;
}
