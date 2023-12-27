// bookmarkSlice.js

import { createSlice } from '@reduxjs/toolkit';

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: [],
  reducers: {
    addBookmark: (state, action) => {
      return [...state, action.payload];
    },
    removeBookmark: (state, action) => {
      return state.filter((bookmark) => bookmark.title !== action.payload.endpoint);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export const selectBookmarks = (state) => state.bookmarks;
export default bookmarkSlice.reducer;
