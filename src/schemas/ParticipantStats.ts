import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class ParticipantStats {
  @Field()
  win: boolean;

  @Field()
  kills: number;

  @Field()
  deaths: number;

  @Field()
  assists: number;

  @Field()
  item0: number;

  @Field()
  item1: number;

  @Field()
  item2: number;

  @Field()
  item3: number;

  @Field()
  item4: number;

  @Field()
  item5: number;

  @Field()
  item6: number;

  @Field()
  goldEarned: number;

  @Field()
  totalDamageTaken: number;

  @Field()
  firstTowerKill: boolean;

  @Field()
  wardsPlaced: number;

  @Field()
  totalMinionsKilled: number;

  @Field()
  firstTowerAssist: boolean;

  @Field()
  participantId: number;

  @Field()
  firstBloodAssist: boolean;
  
  @Field()
  damageDealtToTurrets: number;

  @Field()
  firstBloodKill: boolean;

  @Field()
  sightWardsBoughtInGame: number;

  @Field()
  perk0: number; // Primary path keystone rune.

  @Field()
  perk1: number; // Primary path rune.

  @Field()
  perk2: number; // Primary path rune.

  @Field()
  perk3: number; // Primary path rune.

  @Field()
  perk4: number; // Secondary path rune.

  @Field()
  perk5: number; // Secondary path rune.

  @Field()
  perkPrimaryStyle: number; // Primary rune path

  @Field()
  perkSubStyle: number; // Secondary rune path
}
