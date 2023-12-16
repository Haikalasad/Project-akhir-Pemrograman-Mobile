import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateForm = () => {
        let isValid = true;

        if (username.trim() === '') {
            setUsernameError('Invalid username format.');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleSignUp = async () => {
        if (validateForm()) {
            try {
                const userData = {}; // Define your user data object here
                const jsonString = JSON.stringify(userData);
                await AsyncStorage.setItem('@user-list', jsonString);
                console.log('Data successfully saved in AsyncStorage');
                navigation.navigate('Login');
            } catch (error) {
                console.error('Failed to save data:', error);
            }
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://assets/kucing.jpg' }} // Replace with your image URI
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.form}>
                    <Text>Username</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholder="Enter your username"
                    />
                    <Text style={styles.error}>{usernameError}</Text>

                    <Text>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Enter your password"
                    />
                    <Text style={styles.error}>{passwordError}</Text>

                    <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <Text style={styles.footer}>
                        Already have an account?
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Log in</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    form: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontSize: 14,
    },
    footer: {
        textAlign: 'center',
        marginTop: 20,
    },
    link: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
