import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Button, StyleSheet, TouchableHighlight } from 'react-native';
import { databaseController } from '../common/firebase';
import Plant from '../components/Plant';
const plantsOfCalifornia = require('../dummyData/plantSpeciesOfCalifornia.json');

const plant = plantsOfCalifornia.data[1];


const HomeScreen = ({ route, navigation }) => {
    const [userData, setUserData] = useState({});
    const userFromGoogle = route.params.user;
    console.log("user from google", userFromGoogle);

    //Create and store user if not already in firebase rtdb
    useEffect(() => {
        const fetchUser = async () => {
            const isReturningUser_ = await databaseController.isReturningUser(userFromGoogle.id);
            const isUserDistributionSet_ = await databaseController.isUserDistributionSet(userFromGoogle.id);
            const user_ = await databaseController.getUser(userFromGoogle.id);
            setUserData({
                isReturningUser: isReturningUser_,
                isUserDistributionSet: isUserDistributionSet_,
                user: user_
            });
        }
        fetchUser();
    }, []);

    useEffect(() => {
        if (userData !== {}) {
            if (userData.isReturningUser) {
                console.log('Returning User!');
            } else {
                databaseController.createUser(userFromGoogle);
            }
        }
    }, [userData]);

    const navigateToChooseDistribution = () => {
        navigation.navigate("ChooseDistribution", { user: userData.user });
    }

    const navigateToProfile = () => {
        navigation.navigate("Profile", { user: userData.user });
    }

    return (
        <View style={styles.container}>
            <Text>This is the Home Screen!</Text>
            <Text>Your distribution is {
                userData.isUserDistributionSet ?
                    userData.user.distribution.name :
                    'not set yet!'
            }</Text>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#228056"
                onPress={navigateToChooseDistribution}
                color="#E2AD6B"
            ><View>
                    <Text>{
                        userData.isUserDistributionSet ?
                            'reset distribution' :
                            'set distribution'
                    }</Text>
                </View>
            </TouchableHighlight>
            <ScrollView>
                {plantsOfCalifornia.data.map((p, i) => (
                    <Plant key={i} plant={p} />
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.footer}
                    activeOpacity={0.6}
                    underlayColor="#228056"
                    onPress={navigateToProfile}
                    color="#E2AD6B"
                >
                    <View>
                        <Text>Profile</Text>
                    </View>
                </TouchableHighlight>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    footer: {
        backgroundColor: 'blue',
        position: 'absolute',
        height: 40,
        width: '100%',
        left: 0,
        bottom: 0,
        alignSelf: 'stretch'
    }
})


export default HomeScreen;