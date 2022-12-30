import {createSlice, configureStore} from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    buildings: [] as Building[],
    studyroom: [] as StudyRoom[],
  },
  reducers: {
    setBuildings: (state, action: Action<Building[]>) => {
      state.buildings = action.payload;
    },
    setStudyrooms: (state, action: Action<StudyRoom[]>) => {
      state.studyroom = action.payload;
    },
  },
});

export const {setBuildings, setStudyrooms} = buildingSlice.actions;

export const buildingStore = configureStore({
  reducer: buildingSlice.reducer,
});
