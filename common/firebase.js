const firebase = require('firebase');

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


export const databaseController = {
    createUser: (user) => {
        firebase.database().ref(`users/${user.id}`).set(user);
    },
    getUser: async (userId) => {
        let out = null;
        await firebase
            .database()
            .ref(`users/${userId}`)
            .once("value", (data) => {
                out = data.val();
            });
        return out;
    },
    isReturningUser: async (userId) => {
        let out = false;
        await firebase
            .database()
            .ref(`users/${userId}`)
            .once("value")
            .then(snapshot => {
                out = snapshot.exists();
            });
        return out;
    },
    isUserDistributionSet: async (userId) => {
        let out = false;
        await firebase
            .database()
            .ref(`users/${userId}`)
            .once("value")
            .then(snapshot => {
                out = snapshot.child('distribution').exists();
            });
        return out;
    },
    setDistribution: async (dist, userId) => {
        firebase
            .database()
            .ref(`users/${userId}`)
            .once("value")
            .then(snapshot => {
                if (!snapshot.child('distribution').exists())
                    firebase.database().ref(`users/${userId}/distribution`).set(dist);
            });
    }
};

