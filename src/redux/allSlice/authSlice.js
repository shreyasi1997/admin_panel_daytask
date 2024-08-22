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
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
    logout(state) {
      state.user = null;
      state.status = 'idle';
    },
    // Actions for registration
    registrationSuccess(state, action) {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    registrationFailure(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { loginSuccess, loginFailure, logout, registrationSuccess, registrationFailure } = authSlice.actions;
export default authSlice.reducer;
