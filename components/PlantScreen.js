import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Card, Icon, Divider, } from 'react-native-elements'
import utils from '../common/utils';
import CheckBox from '@react-native-community/checkbox';
import { databaseController } from '../common/firebase';
import trefle from '../common/trefle';

const PlantScreen = ({ navigation, route }) => {
    const { plant, user } = route.params;
    const [userNotesFormState, setUserNotesFormState] = useState({
        isEditing: false,
        userNotes: ''
    });
    const [isFound, setIsFound] = useState(undefined);

    useEffect(() => {
        databaseController
            .getIsPlantFound(user.id, plant.data.id)
            .then(res => {
                setIsFound(res);
            });
        databaseController
            .getPlantUserNotes(user.id, plant.data.id)
            .then(res => {
                console.log(res)
                //Weird workaround to fix an issue with usernotes not rendering
                setUserNotesFormState({ isEditing: true, userNotes: res });
                setUserNotesFormState({ isEditing: false, userNotes: res });
            });
    }, []);


    const handleIsFoundToggle = (isFound) => {
        console.log("ISFOUND" + isFound);
        setIsFound(isFound);
        if (isFound) {
            databaseController.addFoundPlant(user.id, plant);
        } else {
            databaseController.removeFoundPlant(user.id, plant.data.id);
            setUserNotesFormState({ ...userNotesFormState, userNotes: '' })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainsecondaryContentContainer} >
                <Image
                    style={styles.avatar}
                    source={{
                        uri: utils.removeFirstOccurrence(plant.data.image_url, 's')
                    }} />
                <View style={styles.mainsecondaryContentTextContainer}>
                    <Text style={[styles.bold, styles.text]}>{plant.data.common_name}</Text>
                    <Text style={[styles.italic, styles.text]}>{plant.data.scientific_name} </Text>
                    <View style={styles.checkboxContainer} >
                        <CheckBox
                            disabled={false}
                            value={isFound}
                            onValueChange={(val) => handleIsFoundToggle(val)}
                        />
                        <View>
                            <Text style={[styles.checkboxLabel, styles.text]}>Found</Text>
                        </View>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={styles.secondaryContentContainer}>
                <View style={styles.secondaryContentTextContainer}>
                    <Text style={styles.secondaryText}>
                        Genus: {plant.data.main_species.genus}
                    </Text>
                    <Text style={styles.secondaryText}>
                        Family:
                        {plant.data.main_species.family_common_name}
                        ({plant.data.main_species.family})
                    </Text>
                </View>
                <View style={[styles.userNotesContainer, isFound ? {} : styles.disabled]}>

                    <View style={styles.userNotesControlPanelContainer}>
                        <Text style={[styles.secondaryText, styles.bold]}>
                            Notes
                            </Text>
                        <TouchableOpacity
                            disabled={!isFound}
                            style={styles.userNotesButton}
                            onPress={() => {
                                if (isFound) {
                                    setUserNotesFormState({ ...userNotesFormState, isEditing: !userNotesFormState.isEditing });
                                }
                                if (userNotesFormState.isEditing) {
                                    databaseController.setPlantUserNotes(user.id, plant.data.id, userNotesFormState.userNotes);
                                }
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
                                style={styles.userNotes}
                                value={userNotesFormState.userNotes}
                                onChangeText={(val) => setUserNotesFormState({ ...userNotesFormState, userNotes: val })}
                                multiline={true}
                                numberOfLines={3}
                            /> :

                            <View style={styles.userNotesTextContainer}>
                                {
                                    userNotesFormState.userNotes === '' ?
                                        <Text style={[styles.secondaryText, styles.greyText]}>
                                            {isFound ?
                                                'You have not written anything yet.' :
                                                'You can only write notes once you have found this plant.'}
                                        </Text> :
                                        <Text style={styles.secondaryText}>{userNotesFormState.userNotes}</Text>
                                }
                            </View>
                    }
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
    mainsecondaryContentContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    mainsecondaryContentTextContainer: {
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
    secondaryContentContainer: {
        marginTop: 20,
        //  backgroundColor: 'blue'
    },
    secondaryContentTextContainer: {
        marginLeft: 20
    },
    userNotes: {
        borderColor: '#000',
        borderWidth: 0.6,
        width: '100%',

    },
    disabled: {
        backgroundColor: '#ddd',
    },
    userNotesContainer: {
        minHeight: 50,
        margin: 20,
        padding: 10
    },
    userNotesControlPanelContainer: {
        flexDirection: 'row',
        height: 30
    },
    userNotesButton: {
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

