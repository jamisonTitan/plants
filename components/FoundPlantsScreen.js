import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { databaseController } from '../common/firebase';
import { FoundPlant } from '../components/Plant';
import NavBar from './NavBar';

const FoundPlantsScreen = ({ route, navigation }) => {
    const { user } = route.params;

    const [plants, setPlants] = useState([]);

    useEffect(() => {
        databaseController.getFoundPlants(user.id)
            .then(res => setPlants(Object.values(res)));

    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../common/paper.png')}
                style={styles.imgBkg}
            >
                <Text style={[styles.bold, styles.title]}>Found Plants</Text>
                <ScrollView>
                    {plants.length > 0 &&
                        plants.map((p, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    console.log(p.slug)
                                    trefle.fetchPlant(p.slug)
                                        .then(plant => {
                                            navigation.navigate("View Found Plant", { user, plant, dateFound: p.date_found })
                                        });
                                }}
                            >
                                <FoundPlant plant={p} />
                            </TouchableOpacity>
                        ))}
                </ScrollView>
                <NavBar user={user} navigation={navigation} />
            </ImageBackground>
        </View>
    );
};

export default FoundPlantsScreen;

const styles = StyleSheet.create({
    imgBkg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        marginTop: 20
    },
    bold: {
        fontWeight: 'bold'
    },
    title: {
        paddingTop: 20,
        fontSize: 20,
        alignSelf: 'center'
    }
})