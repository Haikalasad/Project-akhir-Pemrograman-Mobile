import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    nama: '',
    username: '',
    password: '',
    isAuthenticated: false,
    user: {
        username: '',
    },
};


export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setNama: (state, action) => {
            state.nama = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        userLoginSuccess: (state, action) => {
            const { nama, username, password } = action.payload;
            state.isAuthenticated = true;
            state.nama = nama;
            state.username = username;
            state.password = password;
            state.user = { username }; 
        },
          
        userLoginFailure: (state) => {
            state.isAuthenticated = false;
        },
        userLogout: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { setNama, setUsername, setPassword, userLoginSuccess, userLoginFailure, userLogout } = profileSlice.actions;

export const userLogin = (username, password) => async (dispatch) => {
    try {
        // Ambil data pengguna dari AsyncStorage
        const userDataString = await AsyncStorage.getItem('@user-list');

        if (!userDataString) {
            // Handle jika tidak ada data pengguna
            dispatch(userLoginFailure());
            return;
        }

        const storedUserData = JSON.parse(userDataString);

        // Bandingkan username dan password dengan data di AsyncStorage
        const isUserValid = storedUserData.username === username && storedUserData.password === password;

        if (isUserValid) {
            // Perbarui status otentikasi dan data pengguna jika berhasil login
            dispatch(userLoginSuccess(storedUserData));
            dispatch(setNama(storedUserData.nama));
            dispatch(setUsername(storedUserData.username));
            dispatch(setPassword(storedUserData.password));
        } else {
            // Jika login gagal, atur status otentikasi kembali ke false
            dispatch(userLoginFailure());
        }
    } catch (error) {
        console.error('Login failed:', error);
        dispatch(userLoginFailure());
    }
};

export default profileSlice.reducer;
