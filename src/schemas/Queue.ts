import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Queue {
  @Field()
  queueId: number;

  @Field()
  map: string;

  @Field(type => String, { nullable: true })
  description: string | null;
}
