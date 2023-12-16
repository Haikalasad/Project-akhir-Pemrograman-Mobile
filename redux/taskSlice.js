// Import the createSlice API from Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (params) => {
    const response = await axios.get('https://pm-todo-api.informatika-itts.my.id/api/tasks', { params });
    const results = response.data.data;
    return results;
});

export const storeTask = createAsyncThunk('task/storeTask', async (payload, { dispatch }) => {
    try {
        const response = await axios.post('https://pm-todo-api.informatika-itts.my.id/api/tasks', payload);
        const results = response.data;
        if (results.success) {
            dispatch(fetchTasks({ nim: payload.nim, isComplete: "0" }));
        }
        return results;
    } catch (error) {
        console.log('error storeTask', error)
    }
});

export const updateTask = createAsyncThunk('task/updateTask', async (payload, { dispatch }) => {
    try {
        const response = await axios.put('https://pm-todo-api.informatika-itts.my.id/api/tasks/' + payload.id, payload);
        const results = response.data;
        if (results.success) {
            dispatch(fetchTasks({ nim: payload.nim, isComplete: payload.completed ? "1" : "0" }));
        }
        return results;
    } catch (error) {
        console.log('error updateTask', error)
    }
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (payload, { dispatch }) => {
    try {
        const response = await axios.delete('https://pm-todo-api.informatika-itts.my.id/api/tasks/' + payload.id);
        const results = response.data;
        if (results.success) {
            dispatch(fetchTasks({ nim: payload.nim, isComplete: payload.completed ? "1" : "0" }));
        }
        return results;
    } catch (error) {
        console.log('error deleteTask', error)
    }
});

// This is the initial state of the slice
const initialState = {
    data: [],
    loading: true
};

export const taskSlice = createSlice({
    name: 'task', // This is the name of the slice, we will later use this name to access the slice from the store
    initialState: initialState, // This is the initial state of the slice
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTasks.pending, state => {
            console.log('pending fetchTasks');
            state.loading = true
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            console.log('fulfilled fetchTasks', action.payload);
            state.data = action.payload
            state.loading = false
        })
        builder.addCase(fetchTasks.rejected, state => {
            console.log('rejected fetchTasks');
            state.loading = false
        })
        builder.addCase(storeTask.pending, state => {
            console.log('pending storeTask');
            state.loading = true
        })
        builder.addCase(storeTask.fulfilled, (state, action) => {
            console.log('fulfilled storeTask', action.payload);
            state.loading = false
        })
        builder.addCase(storeTask.rejected, state => {
            console.log('rejected storeTask');
            state.loading = false
        })
        builder.addCase(updateTask.pending, state => {
            console.log('pending updateTask');
            state.loading = true
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            console.log('fulfilled updateTask', action.payload);
            state.loading = false
        })
        builder.addCase(updateTask.rejected, state => {
            console.log('rejected updateTask');
            state.loading = false
        })
        builder.addCase(deleteTask.pending, state => {
            console.log('pending deleteTask');
            state.loading = true
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            console.log('fulfilled deleteTask', action.payload);
            state.loading = false
        })
        builder.addCase(deleteTask.rejected, state => {
            console.log('rejected deleteTask');
            state.loading = false
        })
    }
});

// We export the reducer function so that it can be added to the store
export default taskSlice.reducer;