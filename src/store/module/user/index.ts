import {createSlice, configureStore} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'app',
  initialState: {
    user: {} as User,
  },
  reducers: {
    setUser: (state, action: Action<User>) => {
      console.log('USER', action.payload);
      state.user = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export const userStore = configureStore({
  reducer: userSlice.reducer,
});
