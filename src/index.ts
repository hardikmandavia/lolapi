import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import MatchReferenceResolver from "./resolvers/MatchReferenceResolver";
import ParticipantResolver from "./resolvers/ParticipantResolver";
import SummonerResolver from "./resolvers/SummonerResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [MatchReferenceResolver, ParticipantResolver, SummonerResolver],
    emitSchemaFile: true
  });

  const server = new GraphQLServer({
    schema
  });

  server.start(() => console.log("Server is running on http://localhost:4000"));
}

bootstrap();
