const { ApolloServer, gql } = require('apollo-server');

// Define Schema (Type Definitions)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define Resolvers (Functions for Schema Fields)
const resolvers = {
    Query: {
        hello: () => "Hello, GraphQL!",
    },
}

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start Server
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
