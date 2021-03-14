const { ApolloServer, gql } = require('apollo-server');
const firebase = require('firebase');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const TrefleAPI = require('./datasources/trefle');
const UserAPI = require('./datasources/user');

//TODO move firebase config vars to a .env file
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCRn68IcS4b5F_jdyTGXIIYZWhK62T4S9g",
    authDomain: "botanistquest.firebaseapp.com",
    databaseURL: 'https://botanistquest-default-rtdb.firebaseio.com/', //TODO
    projectId: "botanistquest",
    storageBucket: "botanistquest.appspot.com",
    messagingSenderId: "171136312997",
    appId: "1:171136312997:web:d704b610a1af197ce94f4c",
    measurementId: "G-F4BRHG5G51"
};

// Initialize Firebase
firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const store = undefined; //TODO connect to firebase store

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            headers: req.headers,
        };
    },
    dataSources: () => ({
        trefleAPI: new TrefleAPI(),
        userAPI: new UserAPI({ store })
    })
});

server.listen().then(({ url }) => {
    console.log(`
    🅢 🅔 🅡 🅥 🅔 🅡   🅡 🅤 🅝 🅝 🅘 🅝 🅖   🅐 🅣 : ${url}
    http://localhost:4000/graphql
    `);
})

