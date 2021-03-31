import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Plant, AddMorePlants } from '../components/Plant';
import trefle from '../common/trefle';
import NavBar from './NavBar';

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
            });

    }, []);

    const handleAddMorePlants = () => {
        setIsLoadingPlants(true);
        trefle.fetchPlantsByLink(plantsState.links.next)
            .then(res => {
                setIsLoadingPlants(false);
                setPlantsState({
                    data: res.data ? ([...plantsState.data, ...res.data]) : plantsState.data,
                    links: res.links
                });
            });

    }

    const submitQuery = () => {
        if (query !== '') {
            setIsLoadingPlants(true);
            trefle.fetchPlantsByQuery(query)
                .then(res => {
                    setPlantsState({
                        data: res.data,
                        links: res.links
                    });
                    setIsLoadingPlants(false);
                })
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../common/paper.png')}
                style={styles.imgBkg}
            >
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
                            {plantsState.data?.length > 0 &&
                                plantsState.data.map((p, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            trefle.fetchPlant(p.id)
                                                .then(plant => {
                                                    navigation.navigate("View Plant", { user, plant })
                                                });
                                        }}
                                    >
                                        <Plant plant={p} />
                                    </TouchableOpacity>

                                ))}
                            {isLoadingPlants ?
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
                <NavBar user={user} navigation={navigation} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    imgBkg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
        width: '100%',
        height: '100%'
    },
    container: {
        paddingTop: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
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