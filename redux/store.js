import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import bookmarkSlice from './bookmarkSlice';

export const store = configureStore({
    reducer: {
        profile: profileSlice,
        bookmark: bookmarkSlice,
    },
});