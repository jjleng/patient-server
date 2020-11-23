const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;

    try {
      authToken = req.headers.authorization;
      if (authToken) {
        // const { uid } = await admin.auth().verifyIdToken(idToken, true);
      }
    } catch (e) {
      // console.error(e);
    }

    return { authenticated: true };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
