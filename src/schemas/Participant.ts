import { Field, ObjectType } from "type-graphql";

import ParticipantStats from "./ParticipantStats";
import ParticipantTimeline from "./ParticipantTimeline";

@ObjectType()
export default class Participant {
  @Field()
  participantId: number;

  @Field()
  championId: number;

  // @Field()
  // runes:	Rune[]

  @Field(type => ParticipantStats)
  stats:	ParticipantStats;

  // @Field(type => ParticipantTimeline)
  // timeline: ParticipantTimeline;

  @Field()
  teamId: number; // 100 for blue side. 200 for red side.

  @Field()
  spell1Id: number;

  @Field()
  spell2Id: number;

  @Field()
  highestAchievedSeasonTier: string;

  // @Field()
  // masteries:	Mastery[];
}
