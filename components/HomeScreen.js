import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Plant, AddMorePlants } from '../components/Plant';
import trefle from '../common/trefle';

const HomeScreen = ({ route, navigation }) => {
    const [plantsState, setPlantsState] = useState({ currPage: 1, data: [] });
    const [isLoadingPlants, setIsLoadingPlants] = useState(false)
    const [query, setQuery] = useState('');
    const { user } = route.params;


    useEffect(() => {
        setIsLoadingPlants(true);
        trefle.fetchPlantsByDistribution(user.distribution.id, plantsState.currPage)
            .then(res => {
                setIsLoadingPlants(false);
                setPlantsState({ data: res.data, currPage: plantsState.currPage });
            });

    }, []);

    const navigateToProfile = () => {
        navigation.navigate("Profile", { user });
    }

    const handleAddMorePlants = useCallback(
        () => {
            trefle.fetchPlantsByQuery(user.distribution.id, query, plantsState.currPage += 1)
                .then(res => {
                    setPlantsState({
                        data: res.data ? ([...res.data, ...plantsState.data]) : plantsState.data,
                        currPage: plantsState.currPage += 1
                    });
                });
        }, []
    );

    const submitQuery = () => {
        setIsLoadingPlants(true);
        trefle.fetchPlantsByQuery(user.distribution.id, query, 1)
            .then(res => {
                console.log("RES" + res)
                setPlantsState({
                    data: res.data,
                    currPage: 1
                });
                setIsLoadingPlants(false);
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        placeholder="Search for a plant..."
                        onChangeText={(q) => {
                            setQuery(q);
                            submitQuery();
                        }}
                        value={query}
                        containerStyle={{ backgroundColor: 'white' }}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                    />
                    <TouchableOpacity
                        style={styles.submitQueryButton}
                        onPress={submitQuery}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
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
                            <Text style={styles.loadingText}>
                                Loading Plants...
                            </Text>
                            :
                            <AddMorePlants onPress={handleAddMorePlants} />
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    footer: {
        backgroundColor: '#aaa',
        position: 'absolute',
        height: 40,
        width: '100%',
        left: 0,
        bottom: 0,
        alignSelf: 'stretch'
    },
    loadingText: {
        alignSelf: 'center',
        marginTop: 100
    },
    searchBarContainer: {
        borderColor: 'white',
        borderWidth: 0
    }
})


export default HomeScreen;