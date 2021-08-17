import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "src/modules/user/Register";
import { createConnection } from "typeorm";

(async () => {
	await createConnection();

	const schema = await buildSchema({
		resolvers: [RegisterResolver],
	});

	const apolloServer = new ApolloServer({ schema });

	await apolloServer.start();

	const app = Express();

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log("Server started on http://localhost:4000/graphql");
	});
})();
