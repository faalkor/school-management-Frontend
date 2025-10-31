import { createSlice } from '@reduxjs/toolkit';
import { updateUserData, updateToken, clearAuthData } from '../shared/actions';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    token: null,
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.token = null;
      state.user = {};
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.token = null;
      state.user = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserData, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateToken, (state, action) => {
        state.token = action.payload;
      })
      .addCase(clearAuthData, (state) => {
        state.isLoggedIn = false;
        state.user = {};
        state.token = '';
      });
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
