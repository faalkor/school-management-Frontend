import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    editPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    editPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    editPasswordFailure: (state, action) => {
      console.log('error');
      state.loading = false;
      state.error = action.payload;
    },
    editUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    editUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    editUserFailure: (state, action) => {
      console.log('error');
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  editPasswordRequest,
  editPasswordSuccess,
  editPasswordFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} = user.actions;
export default user.reducer;
