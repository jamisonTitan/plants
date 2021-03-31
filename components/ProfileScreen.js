import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Card, Image } from "react-native-elements";
import NavBar from "./NavBar";

const ProfileScreen = ({ route, navigation }) => {
    const { user } = route.params;
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../common/paper.png')}
                style={styles.imgBkg}
            >
                <Card >
                    <Card.Title style={styles.text}>{user.name}'s Profile</Card.Title>
                    <Image
                        style={styles.avatar}
                        source={{ uri: user.photoUrl }}
                        style={styles.avatar}
                    />
                    <Card.Divider />
                    <View style={styles.info}>
                        <Text style={[styles.text]}>Plants Found: {Object.values(user.found_plants).length}</Text>
                        <Text style={[styles.text]}>Distribution: {user.distribution.name}</Text>
                        <Text style={[styles.text]}></Text>
                        <Text style={[styles.text]}></Text>
                    </View>
                </Card>
                <NavBar user={user} navigation={navigation} />
            </ImageBackground>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    imgBkg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
        width: '100%',
        height: '100%'
    },
    text: {
        fontSize: 20
    },
    bold: {
        fontWeight: 'bold'
    },
    greyText: {
        color: 'grey'
    },
    container: {
        flex: 1,
        marginTop: 20
    },
    avatar: {
        width: 100,
        height: 100,
        left: 100,
        borderRadius: 50,
        margin: 15
    }
});