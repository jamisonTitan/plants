const firebase = require('firebase');
const { module, console } = require('@ungap/global-this');

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

export const databaseController = {
    createUser: (user) => {
        firebase.database().ref('users/' + user.id).set({ ...user });
    },
    isReturningUser: async (userId) => {
        let email = '';
        firebase
            .database()
            .ref(`users/${userId}`)
            .once("value")
            .then(snapshot => {
                email = snapshot.child('email').val();
            });
        if (email != '') {
            return true;
        } else {
            return false;
        }

    }
};

