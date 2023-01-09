import axios, {AxiosInstance} from 'axios';
import {authStore, loginStudent} from '../../store/module/auth';
import {
  buildingStore,
  setBuildings,
  setLoading,
  setReservations,
  setStudyroom,
  setStudyrooms,
  setStudyroomsGroupByBuildings,
  setFavorites,
  setActiveReservations,
  setExpiredReservations,
} from '../../store/module/building';
import {setUser, userStore} from '../../store/module/user';
import {timeRange} from './data';
class StudentSdk {
  private static _instance: StudentSdk;
  private api!: AxiosInstance;
  constructor({apiUrl}: {apiUrl: string}) {
    if (!StudentSdk._instance) {
      StudentSdk._instance = this;
      StudentSdk._instance.api = axios.create({
        baseURL: apiUrl,
      });
    }
    return StudentSdk._instance;
  }
  async login(username: string, password: string) {
    try {
      const {data} = await StudentSdk._instance.api.post('/student/login', {
        username,
        password,
      });
      StudentSdk._instance.api.defaults.headers.common.Authorization =
        data.data.token;
      console.log('STUDENT LOGIN');
      authStore.dispatch(loginStudent(data.data));
      userStore.dispatch(setUser(data.data));
    } catch (e) {
      return null;
    }
  }
  async getBuilding() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/building/');
    console.log('BUILDING READ', data.data);
    buildingStore.dispatch(setBuildings(data.data));
  }
  async getUser() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/student');
    console.log('USER');
    userStore.dispatch(setUser(data.data));
  }
  async getStudyrooms() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/studyroom');
    console.log('STUDYROOMS READ', data.data[0].studyrooms);
    buildingStore.dispatch(setStudyroomsGroupByBuildings(data.data));
  }
  async getAllStudyrooms() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/studyroom/all');
    console.log('STUDYROOMS READ', data.data[0].studyrooms);
    buildingStore.dispatch(setStudyrooms(data.data));
  }
  async getStudyroom(id: string) {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get(`/studyroom/${id}`);
    console.log('STUDYROOM READ', data);
    buildingStore.dispatch(setStudyroom(data.data));
  }
  async createReservation(id: string, date: Date, key: string) {
    const range = timeRange.find(t => t.key === key);
    try {
      const result = await StudentSdk._instance.api.post(
        '/reservation/create',
        {
          start: range?.start,
          end: range?.end,
          date: date.toUTCString(),
          id: id,
        },
      );
      console.log('RESERVATION CREATE');
      return result.data;
    } catch (e) {
      return null;
    }
  }
  async getReservations() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/reservation');
    console.log('RESERVATION READ', data);
    buildingStore.dispatch(setReservations(data.data));
  }
  async getActiveReservations() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/reservation/active');
    console.log('RESERVATION READ', data);
    buildingStore.dispatch(setActiveReservations(data.data));
  }
  async getExpiredReservations() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/reservation/expired');
    console.log('RESERVATION READ', data);
    buildingStore.dispatch(setExpiredReservations(data.data));
  }
  async deleteReservation(id: string) {
    const {data} = await StudentSdk._instance.api.delete(`/reservation/${id}`);
    console.log('RESERVATION DELETE', data);
  }
  async getAssignedSeats(id: string, date: Date) {
    const {data} = await StudentSdk._instance.api.post('/reservation/', {
      id,
      date: date.toUTCString(),
    });
    console.log('GET ASSIGNED SEATS', data);
    return data.data;
  }
  async createFavorite(id: string) {
    console.log('create');
    const {data} = await StudentSdk._instance.api.get(`/favorite/${id}/create`);
    console.log('FAVORITE CREATE', data);
  }
  async deleteFavorite(id: string) {
    console.log('delete');
    const {data} = await StudentSdk._instance.api.delete(`/favorite/${id}`);
    console.log('FAVORITE DELETE', data);
  }
  async getFavorites() {
    buildingStore.dispatch(setLoading(true));
    const {data} = await StudentSdk._instance.api.get('/favorite');
    console.log('FAVORITE READ', data);
    buildingStore.dispatch(setFavorites(data.data));
  }
}
export const studentSdk = new StudentSdk({
  apiUrl: 'http://172.19.250.200:8080',
});
