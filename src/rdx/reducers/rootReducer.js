import {combineReducers} from 'redux';
import {createSlice} from '@reduxjs/toolkit';
const loginSlice = createSlice({
  name: 'login',
  initialState: {loading: false, data: {}, error: null},
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    OTPSuccess(state, action) {
      state.loading = false;
      // state.data = action.payload;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.data = {};
    },
    logOut(state) {
      state.data = {};
    },
  },
});
export default loginSlice.reducer;
