import {createSlice, configureStore} from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    buildings: [] as Building[],
    studyrooms: [] as StudyRoom[],
    studyroom: {} as StudyRoom,
  },
  reducers: {
    setBuildings: (state, action: Action<Building[]>) => {
      state.buildings = action.payload;
    },
    setStudyrooms: (state, action: Action<StudyRoom[]>) => {
      state.studyrooms = action.payload;
    },
    setStudyroom: (state, action: Action<StudyRoom>) => {
      state.studyroom = action.payload;
    },
  },
});

export const {setBuildings, setStudyrooms, setStudyroom} =
  buildingSlice.actions;

export const buildingStore = configureStore({
  reducer: buildingSlice.reducer,
});
