import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';

export default function Login() {
    const textInputStyle = { height: 40 };
    const [formState, setFormState] = useState({
        isLoggingIn: true,
        name: '',
        username: '',
        password: '',
    });


    return (
        <View>
            {/* TODO logo */}
            <TextInput
                style={textInputStyle}
                placeholder='username'
                onChangeText={text => setFormState({
                    ...formState,
                    username: text
                })}
            />
            <TextInput
                style={textInputStyle}
                placeholder='password'
                onChangeText={text => setFormState({
                    ...formState,
                    password: text
                })}
            />
            <Button
                title="submit"
                onPress={() => submitLogInForm()}
            />
        </View>
    );

}
