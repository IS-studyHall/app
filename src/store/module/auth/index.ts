import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logged: false,
    supervisor: false,
    email: '',
    username: '',
  },
  reducers: {
    loginStudent: (state, action) => {
      const user: User = action.payload;
      state.email = user.email;
      state.username = user.username;
      state.logged = true;
      state.supervisor = false;
    },
    loginSupervisor: (state, action: Action<User>) => {
      const user: User = action.payload;
      state.email = user.email;
      state.username = user.username;
      state.logged = true;
      state.supervisor = true;
    },
    logout: state => {
      state.logged = false;
      state.supervisor = false;
      state.email = '';
      state.username = '';
    },
  },
});

export const {loginStudent, loginSupervisor, logout} = authSlice.actions;

export const authStore = configureStore({
  reducer: authSlice.reducer,
});
