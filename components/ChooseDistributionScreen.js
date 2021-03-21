import React, { useEffect, useState } from 'react';
import { databaseController } from '../common/firebase';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const distributions = require('../common/distributions.json');


const ChooseDistributionScreen = ({ route, navigation }) => {
    const userFromGoogle = route.params.user;
    const [userState, setUserState] = useState({});


    useEffect(() => {
        const updateUserState = async () => {
            const isReturningUser_ = await databaseController.isReturningUser(userFromGoogle.id);
            const isUserDistributionSet_ = await databaseController.isUserDistributionSet(userFromGoogle.id);
            const user_ = await databaseController.getUser(userFromGoogle.id);
            setUserState({
                isReturningUser: isReturningUser_,
                isUserDistributionSet: isUserDistributionSet_,
                user: user_
            });
            if (userState.isUserDistributionSet) {
                navigation.navigate("Home", { user: userState.user });
            }

            if (!userState.isReturningUser && userState.isReturningUser !== undefined) {
                console.log(userState.isReturningUser)
                console.log("CREATED USER")
                databaseController.createUser(userFromGoogle);
            }
        }
        updateUserState();
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Distribution</Text>
            <ScrollView>
                {
                    distributions.data.map((d, i) => (
                        <ListItem
                            key={i}
                            bottomDivider
                            onPress={() => {
                                databaseController.setDistribution(d, userFromGoogle.id);
                                setUserState({ user: { d, ...userFromGoogle }, ...userState });
                            }}
                            ViewComponent={Text}
                            style={styles.listItem}
                        >
                            <ListItem.Content>
                                <ListItem.Title>
                                    {d.name}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24
    },
    container: {
        alignItems: 'center'
    },
    listItem: {
        alignSelf: 'stretch'
    }
});

export default ChooseDistributionScreen;