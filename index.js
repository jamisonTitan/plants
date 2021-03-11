const { ApolloServer, gql } = require('apollo-server');

const TrefleAPI = require('./datasources/trefle');
const UserAPI = require('./datasources/user');

const store = undefined; //TODO connect to firebase store

const typeDefs = gql`
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        trefleAPI: new TrefleAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`
    🅢 🅔 🅡 🅥 🅔 🅡   🅡 🅤 🅝 🅝 🅘 🅝 🅖   🅐 🅣 : ${url}
    Explore at https://studio.apollographql.com/dev 
    or http://localhost:4000/graphql
    `);
})