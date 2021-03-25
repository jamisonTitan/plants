import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Card, Icon, Divider, } from 'react-native-elements'
import utils from '../common/utils';
import CheckBox from '@react-native-community/checkbox';
import { databaseController } from '../common/firebase';
import trefle from '../common/trefle';

const PlantScreen = ({ navigation, route }) => {
    const { plant, user } = route.params;
    const [userNotesFormState, setuserNotesFormState] = useState({
        isEditing: false,
        textInput: ''
    });
    const [isFound, setIsFound] = useState(false);

    useEffect(() => {
        //TODO get is found from db
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.mainContentContainer} >
                <Image
                    style={styles.avatar}
                    source={{
                        uri: utils.removeFirstOccurrence(plant.data.image_url, 's')
                    }} />
                <View style={styles.mainContentTextContainer}>
                    <Text style={[styles.bold, styles.text]}>{plant.data.common_name}</Text>
                    <Text style={[styles.italic, styles.text]}>{plant.data.scientific_name} </Text>
                    <View style={styles.checkboxContainer} >
                        <CheckBox
                            disabled={false}
                            value={isFound}
                            onValueChange={(val) => setIsFound(val)}
                        />
                        <View>
                            <Text style={[styles.checkboxLabel, styles.text]}>Found</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={styles.contentContainer}>
                <View style={styles.contentTextContainer}>
                    <Text style={styles.secondaryText}>
                        Genus: {plant.data.main_species.genus}
                    </Text>
                    <Text style={styles.secondaryText}>
                        Family:
                        {plant.data.main_species.family_common_name}
                        ({plant.data.main_species.family})
                    </Text>
                </View>
                <View style={styles.userNotesContainer}>
                    <Card>
                        <View style={styles.userNotesControlPanelContainer}>
                            <Text style={styles.secondaryText}>
                                Notes
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setuserNotesFormState({ ...userNotesFormState, isEditing: !userNotesFormState.isEditing });
                                }}
                            >
                                <Text style={styles.secondaryText}>
                                    {
                                        userNotesFormState.isEditing ?
                                            'save' :
                                            'edit'
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            userNotesFormState.isEditing ?
                                <TextInput
                                    style={styles.textInput}
                                    value={userNotesFormState.textInput}
                                    onChangeText={(val) => setuserNotesFormState({ ...userNotesFormState, textInput: val })}
                                    multiline={true}
                                    numberOfLines={3}
                                /> :

                                <View style={styles.userNotesTextContainer}>
                                    {
                                        userNotesFormState.textInput === '' ?
                                            <Text style={[styles.secondaryText, styles.greyText]}>
                                                You have not written anything yet.
                                </Text> :
                                            <Text style={styles.secondaryText}>{userNotesFormState.textInput}</Text>
                                    }
                                </View>
                        }
                    </Card>
                </View>
            </View>
        </View >
    )
}

export default PlantScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 20,
    },
    secondaryText: {
        fontSize: 17
    },
    bold: {
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic'
    },
    mainContentContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    mainContentTextContainer: {
        marginLeft: 20,
    },
    checkboxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: -8
    },
    checkboxLabel: {
        marginLeft: 10
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 100
    },
    contentContainer: {
        marginTop: 20,
        //  backgroundColor: 'blue'
    },
    contentTextContainer: {
        marginLeft: 20
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 0.6,
        width: '100%'
    },
    userNotesContainer: {
        minHeight: 50,
        //alignSelf: 'center',
        margin: 20,
        marginLeft: 0,
        width: '100%',
    },
    userNotesControlPanelContainer: {
        flexDirection: 'row',
        height: 30
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginLeft: 5
    },
    userNotesTextContainer: {
        height: 50,
    },
    greyText: {
        color: 'grey'
    },
    card: {
        marginTop: 0,
        marginRight: 50,
    }
});

