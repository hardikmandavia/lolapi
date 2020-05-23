import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Player {
  @Field()
  profileIcon: number;

  @Field()
  accountId: string;

  @Field()
  matchHistoryUri: string;

  @Field()
  currentAccountId: string;

  @Field()
  currentPlatformId: string;

  @Field()
  summonerName: string;

  @Field()
  summonerId: string;

  @Field()
  platformId: string;
}
