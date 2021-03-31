import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, } from "react-native";
import * as Google from "expo-google-app-auth";
import { databaseController } from '../common/firebase';
// import { useFonts } from 'expo-font';

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
            <ImageBackground
                source={require('../common/paper.png')}
                style={styles.imgBkg}
            >
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, styles.bold]}>botanist{"\n"}Quest</Text>
                </View>
                {
                    isLoggingIn ?
                        <View style={styles.buttonContainer} >
                            <Text>Loading...</Text>
                        </View>
                        :
                        < View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={signInAsync}>
                                <Text>Sign in with Google</Text>
                            </TouchableOpacity>
                        </View >
                }
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center'
    },
    button: {
        borderWidth: 0.6,
        borderColor: '#000',
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontSize: 90,
    },
    imgBkg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
        width: '100%',
        height: '100%'
    },
    bold: {
        fontWeight: 'bold'
    },
    titleContainer: {
        paddingTop: 40,
        marginBottom: 100,
    }
});

export default LoginScreen;