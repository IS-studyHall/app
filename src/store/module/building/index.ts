import {createSlice, configureStore} from '@reduxjs/toolkit';

const buildingSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    buildings: [] as Building[],
    studyrooms: [] as StudyRoom[],
    studyroom: {} as StudyRoom,
    studyroomsGroupByBuildings: [] as StudyroomsGroupByBuilding[],
    reservations: [] as Reservation[],
    activeReservations: [] as Reservation[],
    expiredReservations: [] as Reservation[],
    favorites: [] as Favorite[],
  },
  reducers: {
    setLoading: (state, action: Action<boolean>) => {
      state.loading = action.payload;
    },
    setBuildings: (state, action: Action<Building[]>) => {
      state.buildings = action.payload;
      state.loading = false;
    },
    setStudyrooms: (state, action: Action<StudyRoom[]>) => {
      state.studyrooms = action.payload;
      state.loading = false;
    },
    setStudyroom: (state, action: Action<StudyRoom>) => {
      state.studyroom = action.payload;
      state.loading = false;
    },
    setStudyroomsGroupByBuildings: (
      state,
      action: Action<StudyroomsGroupByBuilding[]>,
    ) => {
      state.studyroomsGroupByBuildings = action.payload;
      state.loading = false;
    },
    setReservations: (state, action: Action<Reservation[]>) => {
      state.reservations = action.payload;
      state.loading = false;
    },
    setActiveReservations: (state, action: Action<Reservation[]>) => {
      state.activeReservations = action.payload;
      state.loading = false;
    },
    setExpiredReservations: (state, action: Action<Reservation[]>) => {
      state.expiredReservations = action.payload;
      state.loading = false;
    },
    setFavorites: (state, action: Action<Favorite[]>) => {
      state.favorites = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setBuildings,
  setStudyrooms,
  setStudyroom,
  setStudyroomsGroupByBuildings,
  setReservations,
  setActiveReservations,
  setExpiredReservations,
  setFavorites,
} = buildingSlice.actions;

export const buildingStore = configureStore({
  reducer: buildingSlice.reducer,
});
