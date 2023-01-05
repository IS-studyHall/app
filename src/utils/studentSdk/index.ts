import axios, {AxiosInstance} from 'axios';
import {authStore, loginStudent} from '../../store/module/auth';
import {
  buildingStore,
  setBuildings,
  setStudyroom,
  setStudyrooms,
  setStudyroomsGroupByBuildings,
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
      console.log(e);
    }
  }
  async getBuilding() {
    const {data} = await StudentSdk._instance.api.get('/building/');
    console.log('BUILDING READ', data.data);
    buildingStore.dispatch(setBuildings(data.data));
  }
  async getUser() {
    const {data} = await StudentSdk._instance.api.get('/student');
    console.log('USER');
    userStore.dispatch(setUser(data.data));
  }
  async getStudyrooms() {
    const {data} = await StudentSdk._instance.api.get('/studyroom');
    console.log('STUDYROOMS READ', data.data[0].studyrooms);
    buildingStore.dispatch(setStudyroomsGroupByBuildings(data.data));
  }
  async getStudyroom(id: string) {
    console.log(id);
    const {data} = await StudentSdk._instance.api.get(`/studyroom/${id}`);
    buildingStore.dispatch(setStudyroom(data.data));
    console.log('STUDYROOM READ', data);
  }
  async createReservation(id: string, date: Date, key: string) {
    const range = timeRange.find(t => t.key === key);
    const {data} = await StudentSdk._instance.api.post('/reservation/create', {
      start: range?.start,
      end: range?.end,
      date: date,
    });
    console.log('RESERVATION CREATE', data);
  }
}

export const studentSdk = new StudentSdk({
  apiUrl: 'http://192.168.1.110:8080',
});
