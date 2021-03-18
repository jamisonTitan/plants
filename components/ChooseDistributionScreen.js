import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { databaseController } from '../common/firebase';

const distributions = require('../common/distributions.json');

const ChooseDistributionScreen = ({ route, navigation }) => {
    console.log(distributions.data)
    const { user } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Distribution</Text>
            <ScrollView>
                {
                    distributions.data.map((d, i) => (
                        <ListItem
                            key={i}
                            bottomDivider
                            onPress={() => {
                                databaseController.setDistribution(d, user.id);
                                navigation.navigate("Home", { user });
                            }}
                            ViewComponent={Text}
                            style={styles.listItem}
                        >
                            <ListItem.Content>
                                <ListItem.Title>
                                    {d.name}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24
    },
    container: {
        alignItems: 'center'
    },
    listItem: {
        alignSelf: 'stretch'
    }
});


export default ChooseDistributionScreen;