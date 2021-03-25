import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import { databaseController } from '../common/firebase';


const IOS_CLIENT_ID = '171136312997-6jnaes8pg39lfnpn707gejc4lrktmd0i.apps.googleusercontent.com',
    AND_CLIENT_ID = '171136312997-k64870tedg240cam8402p88b1itpoauc.apps.googleusercontent.com',
    AND_STANDALONE_CLIENT_ID = '171136312997-85u7ti7q46oinh4p8nh27ar2tmmv7rl0.apps.googleusercontent.com';


const LoginScreen = ({ navigation }) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const signInAsync = async () => {
        setIsLoggingIn(true);
        console.log("logging in");
        try {
            const { type, user } = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: AND_CLIENT_ID,
                androidStandaloneAppClientId: AND_STANDALONE_CLIENT_ID
            });

            if (type === "success") {
                setIsLoggingIn(false);
                console.log("success, navigating to profile:" + user.id);
                databaseController.isUserDistributionSet(user.id)
                    .then(res => {
                        if (res) {
                            databaseController.getUser(user.id)
                                .then(res => {
                                    navigation.navigate("Home", { user: res });
                                });
                        } else {
                            navigation.navigate("Choose Distribution", { user });
                        }
                    })

            }
        } catch (error) {
            console.log("error with login", error);
        }
    };

    return (
        <View style={styles.container} >
            {
                isLoggingIn ?
                    <View style={styles.buttonContainer} >
                        <Text>Loading...</Text>
                    </View>
                    :
                    < View style={styles.buttonContainer}>
                        <Button
                            color="#000"
                            style={styles.button}
                            title="Login with Google" onPress={signInAsync} />
                    </View >
            }
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 0,
        margin: 0,
        marginTop: '50%',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#4b8b3b',
    }
});

export default LoginScreen;