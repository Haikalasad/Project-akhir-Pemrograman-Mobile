// Import the createSlice API from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookmark = createAsyncThunk('task/fetchBookmark', async (params) => {
    const response = await axios.get('https://komiku-api.fly.dev/api/comic/popular/page/1', { params });
    const results = response.data.data;
    return results;
});

export const storeBookmark = createAsyncThunk('task/storeBookmark', async (payload, { dispatch }) => {
    try {
        const response = await axios.post('https://komiku-api.fly.dev/api/comic/popular/page/1', payload);
        const results = response.data;
        if (results.success) {
            dispatch(fetchBookmark({ username: payload.username, isComplete: "0" }));
        }
        return results;
    } catch (error) {
        console.log('error storeBookmark', error)
    }
});

export const deleteBookmark = createAsyncThunk('task/deleteBookmark', async (payload, { dispatch }) => {
    try {
        const response = await axios.delete('https://komiku-api.fly.dev/api/comic/popular/page/1' + payload.id);
        const results = response.data;
        if (results.success) {
            dispatch(fetchBookmark({ username: payload.username, isComplete: payload.completed ? "1" : "0" }));
        }
        return results;
    } catch (error) {
        console.log('error deleteBookmark', error)
    }
});

// This is the initial state of the slice
const initialState = {
    data: [],
    loading: true
};

export const bookmarkSlice = createSlice({
    name: 'bookmark', // This is the name of the slice, we will later use this name to access the slice from the store
    initialState: initialState, // This is the initial state of the slice
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchBookmark.pending, state => {
            console.log('pending fetchBookmark');
            state.loading = true
        })
        builder.addCase(fetchBookmark.fulfilled, (state, action) => {
            console.log('fulfilled fetchBookmark', action.payload);
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchBookmark.rejected, state => {
            console.log('rejected fetchBookmark');
            state.loading = false
        })
        builder.addCase(storeBookmark.pending, state => {
            console.log('pending storeBookmark');
            state.loading = true
        })
        builder.addCase(storeBookmark.fulfilled, (state, action) => {
            console.log('fulfilled storeBookmark', action.payload);
            state.loading = false
        })
        builder.addCase(storeBookmark.rejected, state => {
            console.log('rejected storeBookmark');
            state.loading = false
        })
        builder.addCase(deleteBookmark.pending, state => {
            console.log('pending deleteBookmark');
            state.loading = true
        })
        builder.addCase(deleteBookmark.fulfilled, (state, action) => {
            console.log('fulfilled deleteBookmark', action.payload);
            state.loading = false
        })
        builder.addCase(deleteBookmark.rejected, state => {
            console.log('rejected deleteBookmark');
            state.loading = false
        })
    }
});

// We export the reducer function so that it can be added to the store
export default bookmarkSlice.reducer;