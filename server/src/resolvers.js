const userProfile = require("../FirebaseFunctions/userProfile");
const fetch = require('node-fetch');
const databaseUrl = 'https://botanistquest-default-rtdb.firebaseio.com/';

const resolvers = {
    Query: {
        users: async () => {
            const data = await fetch(`${databaseUrl}/users.json`);
            const dataJson = await data.json();
            const keys = Object.keys(dataJson);
            const values = keys.map(function (item) {
                const userData = dataJson[item];
                const graphqlUser = userProfile(userData);
                return graphqlUser;
            });
            return values;
        }
    }
}

module.exports = resolvers;