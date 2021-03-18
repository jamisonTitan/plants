import React from "react";
import { StyleSheet, View, Button, Text, TouchableHighlight } from "react-native";
import * as Google from "expo-google-app-auth";
import { Card } from "react-native-elements";



const IOS_CLIENT_ID = '171136312997-6jnaes8pg39lfnpn707gejc4lrktmd0i.apps.googleusercontent.com',
    AND_CLIENT_ID = '171136312997-k64870tedg240cam8402p88b1itpoauc.apps.googleusercontent.com',
    AND_STANDALONE_CLIENT_ID = '171136312997-85u7ti7q46oinh4p8nh27ar2tmmv7rl0.apps.googleusercontent.com';


const LoginScreen = ({ navigation }) => {
    const signInAsync = async () => {
        console.log("logging in");
        try {
            const { type, user } = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: AND_CLIENT_ID,
                androidStandaloneAppClientId: AND_STANDALONE_CLIENT_ID
            });

            if (type === "success") {
                console.log("success, navigating to home page for profile:" + user.id);
                navigation.navigate("Home", { user });
            }
        } catch (error) {
            console.log("error with login", error);
        }
    };

    return (
        <View style={styles.container} >
            < View>
                <TouchableHighlight
                    style={styles.buttonContainer}
                    activeOpacity={0.6}
                    underlayColor="#228056"
                    onPress={signInAsync}
                    color="#E2AD6B"
                >
                    <View>
                        <Text>Login with Google</Text>
                    </View>
                </TouchableHighlight>
            </View >
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        width: '80%',
        backgroundColor: '#E2AD6B',
        padding: 40,
        alignItems: 'center',

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#228056',
    },
});

export default LoginScreen;