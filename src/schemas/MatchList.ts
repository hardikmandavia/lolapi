import { Field, ObjectType } from 'type-graphql';

import MatchReference from './MatchReference';

@ObjectType()
export default class MatchList {
  @Field()
  startIndex:	number;

  @Field()
  totalGames:	number;

  @Field()
  endIndex:	number;

  @Field(type => [MatchReference])
  matches: MatchReference[];
}
