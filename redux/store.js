import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import bookmarkReducer from './bookmarkSlice';

export const store = configureStore({
    reducer: {
        profile: profileSlice,
        bookmarks: bookmarkReducer,
    },
});