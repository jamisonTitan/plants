import utils from '../common/utils';

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
        firebase.database().ref(`users/${user.id}`).set({ ...user, found_plants: [] });
    },
    getUser: async (userId) => {
        let out = null;
        await firebase
            .database()
            .ref(`users/${userId}`)
            .once('value', (data) => {
                out = data.val();
            });
        return out;
    },
    isReturningUser: async (userId) => {
        let out = false;
        await firebase
            .database()
            .ref(`users/${userId}`)
            .once('value')
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
            .once('value')
            .then(snapshot => {
                out = snapshot.child('distribution').exists();
            });
        return out;
    },
    setDistribution: async (dist, userId) => {
        firebase
            .database()
            .ref(`users/${userId}`)
            .once('value')
            .then((snapshot) => {
                if (!snapshot.child('distribution').exists()) {
                    console.log("OVERWRITING DISTRIBUTION")
                    firebase.database().ref(`users/${userId}/distribution`).set(dist);
                }
            });
    },
    getIsPlantFound: async (userId, plantId) => {
        let out = undefined;
        await firebase
            .database()
            .ref(`users/${userId}/found_plants/${plantId}`)
            .once('value')
            .then((snapshot) => {
                out = snapshot.exists();
            });
        return out;
    },
    addFoundPlant: async (userId, plant) => {
        firebase
            .database()
            .ref(`users/${userId}/found_plants/${plant.data.id}`)
            .set({
                date_found: utils.now(),
                slug: plant.data.slug,
                user_notes: '',
                name: plant.data.common_name ? plant.data.common_name : plant.data.scientific_name,
                image_url: plant.data.image_url
            });
    },
    removeFoundPlant: async (userId, plantId) => {
        console.log("REMOVING PLANT")
        firebase
            .database()
            .ref(`users/${userId}/found_plants/${plantId}`)
            .remove();
    },
    setPlantUserNotes: async (userId, plantId, userNotes) => {
        firebase
            .database()
            .ref(`users/${userId}/found_plants/${plantId}/user_notes`)
            .set(userNotes);
    },
    getPlantUserNotes: async (userId, plantId) => {
        let out = '';
        await firebase
            .database()
            .ref(`users/${userId}/found_plants/${plantId}/user_notes`)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    out = snapshot.val();
                }
            });
        return out;
    },
    getFoundPlants: async (userId) => {
        let out = null;
        await firebase
            .database()
            .ref(`users/${userId}/found_plants`)
            .once('value')
            .then(snapshot => {
                out = snapshot.val();
            });
        return out;
    },
};

