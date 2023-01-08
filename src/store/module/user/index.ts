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
    },
  },
});

export const {setUser} = userSlice.actions;

export const userStore = configureStore({
  reducer: userSlice.reducer,
});
