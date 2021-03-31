import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
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
                        <Text style={[styles.text, styles.bold]}>{
                            plant.plant.common_name ?
                                plant.plant.common_name :
                                plant.plant.scientific_name
                        }</Text>
                        <Text style={[styles.text, styles.greyText]}>Family: {plant.plant.family_common_name} </Text>
                        <Text style={[styles.text, styles.greyText]}>Genus: {plant.plant.genus}</Text>
                    </View>
                </View>
            </Card>
        </View>
    );
}

export const FoundPlant = (plant) => {
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
                        <Text style={[styles.title, styles.bold, styles.text]}>{
                            plant.plant.name
                        }</Text>
                        <Text style={[styles.greyText, styles.text]}>Found on:</Text>
                        <Text style={[styles.greyText, styles.text]}>{plant.plant.date_found.date}</Text>
                        <Text style={[styles.greyText, styles.text]}>{plant.plant.date_found.time}</Text>
                    </View>
                </View>
            </Card>
        </View>
    );
}

export const AddMorePlants = ({ onPress }) => {
    return (
        <TouchableOpacity
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
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 130
    },
    text: {
        fontSize: 17
    },
    bold: {
        fontWeight: 'bold'
    },
    greyText: {
        color: 'grey',
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
        borderLeftWidth: 10,
    }
});

