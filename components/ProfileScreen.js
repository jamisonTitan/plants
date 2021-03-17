import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { databaseController } from '../firebase';
import { Card, Image } from "react-native-elements";
import { FlingGestureHandler } from "react-native-gesture-handler";

const ProfileScreen = ({ route, navigation }) => {
    const [isReturningUser, setIsReturninguser] = useState({});
    const { user } = route.params;
    console.log("user from google", user);
    useEffect(() => {
        const fetchUser = async () => {
            const isReturningUser = await databaseController.isReturningUser(user.id);
            (isReturningUser) ?
                console.log('Returning User!') :
                databaseController.createUser(user);
        }
        fetchUser();
    }, []);
    return (
        <View >
            <Card >
                <Card.Title>{user.name}'s Profile</Card.Title>
                <Image
                    style={styles.avatar}
                    source={{ uri: user.photoUrl }}
                    style={styles.avatar}
                />
                <Card.Divider />

                <View style={styles.info}>
                    <Text>Bavarian bergkase swiss brie. Mozzarella cheese on toast hard cheese jarlsberg cheese slices when the cheese comes out everybody's happy swiss bavarian bergkase. Cheese and biscuits cheese and wine emmental feta pepper jack macaroni cheese ricotta croque monsieur. When the cheese comes out everybody's happy cheesy feet.</Text>
                </View>
            </Card>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        left: 100,
        borderRadius: 50,
        margin: 15
    }
});