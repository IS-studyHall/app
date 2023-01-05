import {createSlice, configureStore} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'app',
  initialState: {
    user: {} as User,
  },
  reducers: {
    setUser: (state, action: Action<User>) => {
      console.log('USER', action.payload);
      state.user.username = action.payload.username;
    },
  },
});

export const {setUser} = userSlice.actions;

export const userStore = configureStore({
  reducer: userSlice.reducer,
});
