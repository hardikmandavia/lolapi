import { FieldResolver, Resolver, Root } from "type-graphql";

import Participant from "../schemas/Participant";

@Resolver(of => Participant)
export default class {
  // @FieldResolver()
  // participantTimeline(@Root() participant: any) {
  //   return participant.participantTimeline;
  // }
}