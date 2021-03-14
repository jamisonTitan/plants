import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { databaseController } from '../firebase';

const ProfileScreen = ({ route, navigation }) => {
    const [isReturningUser, setIsReturninguser] = useState({});
    const { user } = route.params;
    console.log("user from google", user);
    useEffect(() => {
        const fetchUser = async () => {
            const isReturningUser = await databaseController.isReturningUser(user.id);
            setIsReturninguser(isReturningUser);
            console.log(isReturningUser + "FUCKKK");
            if (isReturningUser) {
                console.log('Returning User!')
            } else {
                databaseController.createUser(user);
            }
        }
        fetchUser();
    }, []);

    console.log(isReturningUser);
    return (
        <View>
            <Text>Profile Screen</Text>
            <Text>Welcome {user.name} !</Text>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({});