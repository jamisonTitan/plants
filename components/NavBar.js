import React from 'react';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavBar = ({ navigation, user }) => {

    const navigate = (r) => {
        navigation.navigate(r, { user })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                underlayColor="#228056"
                onPress={() => navigate("Profile")}
                color="#E2AD6B"
            >
                <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                underlayColor="#228056"
                onPress={() => navigate("Home")}
                color="#E2AD6B"
            >
                <FontAwesome5 name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                underlayColor="#228056"
                onPress={() => navigate("Found Plants")}
                color="#E2AD6B"
            >
                <Feather name="list" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 0.6,
        position: 'absolute',
        height: 60,
        width: '100%',
        left: 0,
        bottom: 0,
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        padding: 20,
        marginRight: 20,
        marginLeft: 20
    }
});