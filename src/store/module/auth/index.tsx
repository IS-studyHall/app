import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: false,
    supervisor: false,
  },
  reducers: {
    loginStudent: (state, action) => {
      console.log(action);
      state.logged = true;
      state.supervisor = false;
    },
    loginSupervisor: (state, action) => {
      console.log(action);
      state.logged = true;
      state.supervisor = true;
    },
    logout: state => {
      state.logged = false;
      state.supervisor = false;
    },
  },
});

export const {loginStudent, loginSupervisor, logout} = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
