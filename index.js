const { ApolloServer } = require("apollo-server");

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");
const models = require("./models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
