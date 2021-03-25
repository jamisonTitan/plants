import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Plant, AddMorePlants } from '../components/Plant';
import trefle from '../common/trefle';
const plantsOfCalifornia = require('../dummyData/plantSpeciesOfCalifornia.json');


const plant = plantsOfCalifornia.data[1];


const HomeScreen = ({ route, navigation }) => {
    const [plantsState, setPlantsState] = useState({ currPage: 1, data: [] });
    const [isLoadingPlants, setIsLoadingPlants] = useState(false)
    const { user } = route.params;


    useEffect(() => {
        setIsLoadingPlants(true);
        trefle.fetchPlantsInDistribution(user.distribution.id, plantsState.currPage)
            .then(res => {
                setIsLoadingPlants(false);
                setPlantsState({ data: res.data, currPage: plantsState.currPage });
            });

    }, []);

    useEffect(() => {
        //TODO render new plants if needed
    }, [plantsState])

    const navigateToProfile = () => {
        navigation.navigate("Profile", { user });
    }

    const addMorePlantsHandler = useCallback(
        () => {
            trefle.fetchPlantsInDistribution(user.distribution.id, plantsState.currPage += 1)
                .then(res => {
                    console.log(res.data + "RRRDDDDD" + plantsState.data + "PPPPPPDDDDDD");
                    setPlantsState({
                        data: res.data ? ([...res.data, ...plantsState.data]) : plantsState.data,
                        currPage: plantsState.currPage += 1
                    });
                });
            console.log('wtfuuuckkk!')
        }
        , []
    );

    // const addMorePlantsHandler = () => {
    //     trefle.fetchPlantsInDistribution(user.distribution.id, plantsState.currPage += 1)
    //         .then(res => {
    //             console.log('userdistid', user.distribution.id, 'currPage', plantsState.currPage)
    //             console.log(res.data + "RRRDDDDD" + plantsState.data + "PPPPPPDDDDDD");
    //             setPlantsState({ data: [...res.data], currPage: plantsState.currPage += 1 });
    //         });
    //     console.log('wtfuuuckkk!')
    // }


    return (
        <View style={styles.container}>
            <View>
                <ScrollView>
                    {
                        plantsState.data?.length > 0 &&
                        plantsState.data.map((p, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    console.log('navigating to plant');
                                    trefle.fetchPlant(p.id)
                                        .then(plant => {
                                            console.log('plant' + plant)
                                            navigation.navigate("View Plant", { user, plant })
                                        });
                                }}
                            >
                                <Plant plant={p} />
                            </TouchableOpacity>

                        ))
                    }
                    {
                        isLoadingPlants ?
                            <ActivityIndicator size='large' /> :
                            <AddMorePlants onPress={addMorePlantsHandler} />
                    }
                </ScrollView>

            </View>

            <View style={styles.footer}>
                <TouchableHighlight
                    style={styles.footer}
                    activeOpacity={0.6}
                    underlayColor="#228056"
                    onPress={navigateToProfile}
                    color="#E2AD6B"
                >
                    <View>
                        <Text>Profile</Text>
                    </View>
                </TouchableHighlight>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5E9A4',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    footer: {
        backgroundColor: '#228056',
        position: 'absolute',
        height: 40,
        width: '100%',
        left: 0,
        bottom: 0,
        alignSelf: 'stretch'
    },
    button: {
        borderRadius: 50,
        width: '80%',
        backgroundColor: '#fff',
        padding: 10,
        alignItems: 'center',
    }
})


export default HomeScreen;