import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Champion {
  @Field()
  id: string;

  @Field()
  key: string;
}
