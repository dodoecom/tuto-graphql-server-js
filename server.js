const { ApolloServer, gql } = require('apollo-server');

// Define Schema (Type Definitions)
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
  }
`;

let users = [
  { id: 1, name: 'David Diaz', age: 25 },
  { id: 2, name: 'Jane Doe', age: 28 },
];

// Define Resolvers (Functions for Schema Fields)
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, {name, age}) => {
      const newUser = { id: users.length + 1, name: name, age: age };
      users.push(newUser);
      return newUser;
    },
  },
}

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start Server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
