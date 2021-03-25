import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import utils from '../common/utils';


export const Plant = (plant) => {

    return (
        <View>
            <Card containerStyle={styles.card}>
                <View style={styles.container}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: utils.removeFirstOccurrence(plant.plant.image_url, 's')
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

export const AddMorePlants = ({ onPress }) => {
    return (
        <TouchableHighlight
            onPress={onPress}>
            <View>
                <Card containerStyle={styles.card}>
                    <View
                        style={styles.iconContainer}>
                        <Icon
                            raised
                            name='plus'
                            type='font-awesome'
                            color='#000'
                        />
                    </View>
                </Card>
            </View>
        </TouchableHighlight>
    )
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
    iconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
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

