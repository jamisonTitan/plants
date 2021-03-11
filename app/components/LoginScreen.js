import React from "react";
import { StyleSheet, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID = '171136312997-6jnaes8pg39lfnpn707gejc4lrktmd0i.apps.googleusercontent.com',
    AND_CLIENT_ID = '171136312997-k64870tedg240cam8402p88b1itpoauc.apps.googleusercontent.com';


const LoginScreen = ({ navigation }) => {
    const signInAsync = async () => {
        console.log("LoginScreen.js 6 | loggin in");
        try {
            const { type, user } = await Google.logInAsync({
                iosClientId: IOS_CLIENT_ID,
                androidClientId: AND_CLIENT_ID,
            });

            if (type === "success") {
                // Then you can use the Google REST API
                console.log("LoginScreen.js 17 | success, navigating to profile");
                navigation.navigate("Profile", { user });
            }
        } catch (error) {
            console.log("LoginScreen.js 19 | error with login", error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Login with Google" onPress={signInAsync} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});