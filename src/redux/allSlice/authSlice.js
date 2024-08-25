import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Actions for login
    loginSuccess(state, action) {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null; // Clear error on successful login
    },
    loginFailure(state, action) {
      state.error = action.payload; // Set error message from action payload
      state.status = 'failed';
    },
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null; // Clear error on logout
    },
    // Actions for registration
    registrationSuccess(state, action) {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null; // Clear error on successful registration
    },
    registrationFailure(state, action) {
      state.error = action.payload; // Set error message from action payload
      state.status = 'failed';
    },
  },
});

export const { loginSuccess, loginFailure, logout, registrationSuccess, registrationFailure } = authSlice.actions;
export default authSlice.reducer;
