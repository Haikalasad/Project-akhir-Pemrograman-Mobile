// Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setPassword, userLogin ,userLoginSuccess} from '../redux/profileSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { username, password } = useSelector((state) => state.profile);
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

// Login.js
// Login.js
const handleLogin = async () => {
    if (validateForm()) {
      try {
        // Mendapatkan data pengguna dari AsyncStorage
        const storedUserData = await AsyncStorage.getItem('@user-list');
        const storedUser = JSON.parse(storedUserData);
  
        if (!storedUser) {
          console.error('No user data found.');
          return;
        }
  
        // Dispatch the userLogin action to update Redux state
        dispatch(userLogin(storedUser.username, storedUser.password));
        console.log(storedUser);
        dispatch(userLoginSuccess(storedUser));
  
        // Navigate to the main screen (adjust as needed)
        navigation.navigate('BottomNavigator');
      } catch (error) {
        console.error('Login failed:', error);
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
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => dispatch(setUsername(text))}
            value={username}
            placeholder="Enter your username"
          />
          <Text style={styles.error}>{usernameError}</Text>

          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => dispatch(setPassword(text))}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <Text style={styles.error}>{passwordError}</Text>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.link}>Signup</Text>
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

export default Login;
