import {createSlice, configureStore} from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'app',
  initialState: {
    buildings: [] as Building[],
    studyrooms: [] as StudyRoom[],
    studyroom: {} as StudyRoom,
    studyroomsGroupByBuildings: [] as StudyroomsGroupByBuilding[],
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
    setStudyroomsGroupByBuildings: (
      state,
      action: Action<StudyroomsGroupByBuilding[]>,
    ) => {
      state.studyroomsGroupByBuildings = action.payload;
    },
  },
});

export const {
  setBuildings,
  setStudyrooms,
  setStudyroom,
  setStudyroomsGroupByBuildings,
} = buildingSlice.actions;

export const buildingStore = configureStore({
  reducer: buildingSlice.reducer,
});
