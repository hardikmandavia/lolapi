import { ApolloServer, IResolvers } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import { environment } from "./environment";
import * as resolvers from "./resolvers";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: Object.values(resolvers),
    emitSchemaFile: true
  });

  const { introspection, playground } = environment.apollo;
  const server = new ApolloServer({
    schema,
    introspection,
    playground
  });

  server.listen(environment.port).then(({ url }) => console.log(`Server ready at ${url} `));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => console.log("Module disposed. "));
  }
}

bootstrap();
