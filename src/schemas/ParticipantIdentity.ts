import { Field, ObjectType } from "type-graphql";

import Player from "./Player";

@ObjectType()
export default class ParticipantIdentity {
  @Field()
  participantId: number;

  @Field(type => Player)
  player: Player;
}
