// Import the createSlice API from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// This is the initial state of the slice
const initialState = {
    user: null,
    
};

export const profileSlice = createSlice({
    name: 'profile', // This is the name of the slice, we will later use this name to access the slice from the store
    initialState: initialState, // This is the initial state of the slice
    reducers: {
        // All the reducers go here
        setNama: (state, action) => {
            // This is the reducer function for the deposit action
            state.nama = action.payload;
        },
        setNim: (state, action) => {
            // This is the reducer function for the withdraw action
            state.nim = action.payload;
        },
        userLogin: (state, action) => {
            // This is the reducer function for the withdraw action
            state.user = action.payload;
        },
         // All the reducers go here
         setUsername: (state, action) => {
            // This is the reducer function for the deposit action
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            // This is the reducer function for the withdraw action
            state.password = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { userLogin} = profileSlice.actions;

// We export the reducer function so that it can be added to the store
export default profileSlice.reducer;