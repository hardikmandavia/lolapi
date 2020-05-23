import { Field, ObjectType } from "type-graphql";

import PeriodValues from "./PeriodValues";

@ObjectType()
export default class ParticipantTimeline {
  @Field()
  participantId: number;

  @Field(type => PeriodValues)
  csDiffPerMinDeltas: PeriodValues;

  @Field()
  damageTakenPerMinDeltas: PeriodValues;

  @Field()
  role: string;

  @Field(type => PeriodValues)
  damageTakenDiffPerMinDeltas: PeriodValues;

  @Field(type => PeriodValues)
  xpPerMinDeltas: PeriodValues;

  @Field(type => PeriodValues)
  xpDiffPerMinDeltas: PeriodValues;

  @Field()
  lane: string;

  @Field(type => PeriodValues)
  creepsPerMinDeltas: PeriodValues;

  @Field(type => PeriodValues)
  goldPerMinDeltas: PeriodValues;
}
