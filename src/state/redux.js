import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  dataPolls: null,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setGuest: (state, action) => {
      state.user = action.payload.user;
    },
    setPolls: (state, action) => {
      state.dataPolls = action.payload.dataPolls;
    },
  },
});

export const { setLogin, setLogout, setGuest, setMode, setPolls } = authSlice.actions;
export default authSlice.reducer;
