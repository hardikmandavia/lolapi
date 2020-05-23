import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class PeriodValues {
  @Field()
  q1: number;

  @Field()
  q2: number;

  @Field()
  q3: number;

  @Field()
  q4: number;
}
