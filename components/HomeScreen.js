import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Plant, AddMorePlants } from '../components/Plant';
import trefle from '../common/trefle';

const HomeScreen = ({ route, navigation }) => {
    const [plantsState, setPlantsState] = useState({ links: {}, data: [] });
    const [isLoadingPlants, setIsLoadingPlants] = useState(false)
    const [query, setQuery] = useState('');
    const { user } = route.params;


    useEffect(() => {
        setIsLoadingPlants(true);
        trefle.fetchPlantsByDistribution(user.distribution.id)
            .then(res => {
                setIsLoadingPlants(false);
                const { data, links } = res;
                setPlantsState({ data, links });
                console.log("LINKSC", plantsState.links);
            });

    }, []);

    const navigateToProfile = () => {
        navigation.navigate("Profile", { user });
    }

    const handleAddMorePlants = () => {
        console.log("Links before call1:", plantsState.links);
        setIsLoadingPlants(true);
        trefle.fetchPlantsByLink(plantsState.links.next)
            .then(res => {
                setIsLoadingPlants(false);
                setPlantsState({
                    data: res.data ? ([...res.data, ...plantsState.data]) : plantsState.data,
                    links: res.links
                });
                console.log("LINKSB", res.links);
            });

    }

    const submitQuery = () => {
        setIsLoadingPlants(true);
        console.log(query)
        console.log("Links before call2:", plantsState.links);
        trefle.fetchPlantsByQuery(query)
            .then(res => {
                setPlantsState({
                    data: res.data,
                    links: res.links
                });
                setIsLoadingPlants(false);
                console.log("LINKSA", res.links);
            })
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.searchBarContainer}>
                    <SearchBar
                        placeholder="Search for a plant..."
                        onChangeText={(q) => setQuery(q)}
                        onSubmitEditing={() => submitQuery()}
                        value={query}
                        containerStyle={styles.searchBar}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                    />
                </View>
                <View style={styles.plantsContainer}>
                    <ScrollView >
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
                            </Text> :
                                (plantsState.links.first === plantsState.links.last) ||
                                    (plantsState.links.self === plantsState.links.last) ?
                                    <Text style={{ alignSelf: 'center' }}>No more results.</Text> :
                                    <AddMorePlants onPress={handleAddMorePlants} />

                        }
                    </ScrollView>
                </View>
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
    searchBar: {
        backgroundColor: '#fff',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBarContainer: {
        borderColor: 'white',
        borderWidth: 0,
    },
    plantsContainer: {
        paddingBottom: 200
    }
})


export default HomeScreen;