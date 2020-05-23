import { FieldResolver, Resolver, Root } from "type-graphql";

import Champion from "../schemas/Champion";
import Match from "../schemas/Match";
import MatchReference from "../schemas/MatchReference";
import Queue from "../schemas/Queue";

import * as champions from "../data/champion.json";
import * as queues from "../data/queues.json";

import { getMatchById } from "../riotApi/Matches";

@Resolver(of => MatchReference)
export default class {
  @FieldResolver()
  gameDetails(@Root() matchReference: MatchReference) {
    const { gameId, region } = matchReference;
    return getMatchById(region, gameId)
      .then((data: Match) => data)
      .catch(e => console.log(e.message));
  }

  @FieldResolver()
  championDetails(@Root() matchReference: MatchReference) {
    const { data } = champions;
    const championValues = Object.values(data);

    const champion: Champion | undefined = championValues.find(
      c => c.key === matchReference.champion.toString()
    );

    return champion;
  }

  @FieldResolver()
  queueDetails(@Root() matchReference: MatchReference) {
    const queue: Queue | undefined = queues.find(
      q => q.queueId === matchReference.queue
    );

    return queue;
  }
}
