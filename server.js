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
    updateUser(id: ID!, name: String!, age: Int!): User
    deleteUser(id: ID!): User
  }
`;

// Sample Data
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
    updateUser: (_, {id, name, age}) => {
      const userIndex = users.findIndex(user => parseInt(user.id) === parseInt(id));
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      users[userIndex] = { id, name, age };
      return users[userIndex];
    },
    deleteUser: (_, {id}) => {
      const userIndex = users.findIndex(user => parseInt(user.id) === parseInt(id));
      if (userIndex === -1) {
        throw new Error('User not found');
      }
      const deletedUser = users.slice(userIndex, 1)[0];
      return deletedUser;
    }
  },
}

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start Server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
