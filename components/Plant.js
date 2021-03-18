import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements'

const Plant = (plant) => {
    console.log('PP' + plant.plant);
    const [found, setFound] = useState(false);

    //used to change https -> http in image_urls
    const remove_first_occurrence = (str, searchstr) => {
        var index = str.indexOf(searchstr);
        if (index === -1) {
            return str;
        }
        return str.slice(0, index) + str.slice(index + searchstr.length);
    }
    return (
        <View>
            <Card containerStyle={styles.card}>
                <View style={styles.container}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri:
                                remove_first_occurrence(plant.plant.image_url, 's')
                        }}
                    />
                    <View style={styles.info}>
                        <Card.Title>{plant.plant.common_name}</Card.Title>
                        <Text>Family: {plant.plant.family_common_name} </Text>
                        <Text>Genus: {plant.plant.genus}</Text>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 130
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10
    },
    info: {
        borderLeftWidth: 10
    }
});

export default Plant;
