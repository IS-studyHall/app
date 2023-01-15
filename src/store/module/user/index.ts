import {createSlice, configureStore} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'app',
  initialState: {
    user: {} as User,
  },
  reducers: {
    setUser: (state, action: Action<User>) => {
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.matricola = action.payload.matricola;
    },
  },
});

export const {setUser} = userSlice.actions;

export const userStore = configureStore({
  reducer: userSlice.reducer,
});
