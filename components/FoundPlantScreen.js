import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Card, Icon, Divider } from 'react-native-elements'
import utils from '../common/utils';
import { databaseController } from '../common/firebase';
import { AntDesign } from '@expo/vector-icons';
import trefle from '../common/trefle';

const FoundPlantScreen = ({ navigation, route }) => {
    const { plant, user, dateFound } = route.params;
    const [userNotesFormState, setUserNotesFormState] = useState({
        isEditing: false,
        userNotes: ''
    });

    useEffect(() => {
        databaseController
            .getPlantUserNotes(user.id, plant.data?.id)
            .then(res => {
                console.log(res)
                //Weird workaround to fix an issue with usernotes not rendering
                setUserNotesFormState({ isEditing: true, userNotes: res });
                setUserNotesFormState({ isEditing: false, userNotes: res });
            });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../common/paper.png')}
                style={styles.imgBkg}
            >

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Found Plants", { user })}
                >
                    <AntDesign name="back" size={24} color="black" />
                    <Text style={[styles.backButtonLabel, styles.secondaryText, styles.bold, styles.greyText]}>Back</Text>
                </TouchableOpacity>
                <View style={styles.mainsecondaryContentContainer} >
                    <Image
                        style={styles.avatar}
                        source={{
                            //TODO add user pic
                            uri: utils.removeFirstOccurrence(plant.data?.image_url, 's')
                        }} />
                    <View style={styles.mainsecondaryContentTextContainer}>
                        <Text style={[styles.bold, styles.text]}>{
                            plant.data?.common_name ?
                                plant.data?.common_name :
                                plant.data?.scientific_name
                        }</Text>
                        <Text style={[styles.italic, styles.text]}>{plant.data?.scientific_name} </Text>
                        <Text style={[styles.greyText, styles.text]}>Found on:</Text>
                        <Text style={[styles.greyText, styles.text]}>{dateFound.date}</Text>
                        <Text style={[styles.greyText, styles.text]}>{dateFound.time}</Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.secondaryContentContainer}>
                    <View style={styles.secondaryContentTextContainer}>
                        <Text style={styles.secondaryText}>
                            Genus: {plant.data?.main_species.genus}
                        </Text>
                        <Text style={styles.secondaryText}>
                            Family:
                        {plant.data?.main_species.family_common_name}
                        ({plant.data?.main_species.family})
                    </Text>
                    </View>
                    <View style={styles.userNotesContainer}>

                        <View style={styles.userNotesControlPanelContainer}>
                            <Text style={[styles.secondaryText, styles.bold]}>
                                Notes
                            </Text>
                            <TouchableOpacity
                                style={styles.userNotesButton}
                                onPress={() => {
                                    setUserNotesFormState({ ...userNotesFormState, isEditing: !userNotesFormState.isEditing });
                                    if (userNotesFormState.isEditing) {
                                        databaseController.setPlantUserNotes(user.id, plant.data?.id, userNotesFormState.userNotes);
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
                                                You have not written anything yet.
                                        </Text> :
                                            <Text style={styles.secondaryText}>{userNotesFormState.userNotes}</Text>
                                    }
                                </View>
                        }
                    </View>

                </View>
            </ImageBackground >
        </View >
    )
}

export default FoundPlantScreen;

const styles = StyleSheet.create({
    imgBkg: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-start",
        width: '100%',
        height: '100%'
    },
    backButtonLabel: {
        marginLeft: 10
    },
    backButton: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    container: {
        paddingTop: 30,
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

