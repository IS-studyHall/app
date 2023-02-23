import axios, {AxiosInstance} from 'axios';
import {loginSupervisor, authStore} from '../../store/module/auth';
import {
  buildingStore,
  setBuildings,
  setReservations,
  setStudyroom,
  setStudyrooms,
} from '../../store/module/building';
import {setUser, userStore} from '../../store/module/user';

class SupervisorSdk {
  private static _instance: SupervisorSdk;
  private api!: AxiosInstance;
  constructor({apiUrl}: {apiUrl: string}) {
    if (!SupervisorSdk._instance) {
      SupervisorSdk._instance = this;
      console.log('API', apiUrl);
      SupervisorSdk._instance.api = axios.create({
        baseURL: apiUrl,
      });
    }
    return SupervisorSdk._instance;
  }
  async login(email: string, password: string) {
    try {
      console.log('SUPERVISOR LOGIN');
      const {data} = await SupervisorSdk._instance.api.post(
        '/organization/login',
        {
          email,
          password,
        },
      );
      console.log('SUPERVISOR LOGIN');
      SupervisorSdk._instance.api.defaults.headers.common.Authorization =
        data.data.token;
      console.log('SUPERVISOR LOGIN');
      authStore.dispatch(loginSupervisor(data.data));
      return data.data;
    } catch (e) {
      return null;
    }
  }
  async getBuilding() {
    const {data} = await SupervisorSdk._instance.api.get('/building/');
    console.log('BUILDING READ', data.data);
    buildingStore.dispatch(setBuildings(data.data));
  }
  async createStudyroom(
    name: string,
    building: string,
    floor: string,
    seats: string,
    image: string,
  ) {
    try {
      const {data} = await SupervisorSdk._instance.api.post(
        '/studyroom/create',
        {
          name,
          building,
          floor,
          seats,
          image,
        },
      );
      console.log('STUDYROOM CREATE');
      return data;
    } catch (e) {
      return null;
    }
  }
  async updateStudyroom(
    id: string,
    name: string,
    building: string,
    floor: string,
    seats: string,
    image: string,
  ) {
    await SupervisorSdk._instance.api.patch(`/studyroom/${id}`, {
      name,
      building,
      floor,
      seats,
      image,
    });
    console.log('STUDYROOM UPDATE');
  }
  async getStudyrooms() {
    const {data} = await SupervisorSdk._instance.api.get(
      '/studyroom/supervisor',
    );
    console.log('STUDYROOMS READ', data);
    buildingStore.dispatch(setStudyrooms(data.data));
  }

  async getStudyroom(id: string) {
    const {data} = await SupervisorSdk._instance.api.get(`/studyroom/${id}`);
    buildingStore.dispatch(setStudyroom(data.data));
    console.log('STUDYROOM READ', data);
  }

  async deleteStudyroom(id: string) {
    await SupervisorSdk._instance.api.delete(`/studyroom/${id}`);
    console.log('STUDYROOM DELETE', id);
  }

  async changeStatusStudyroom(id: string) {
    await SupervisorSdk._instance.api.get(`/studyroom/${id}/changestatus`);
    console.log('STUDYROOM CHANGE STATUS', id);
  }

  async getUser() {
    const {data} = await SupervisorSdk._instance.api.get('/user');
    console.log('USER');
    userStore.dispatch(setUser(data.data));
  }

  async getReservations(id: string) {
    const {data} = await SupervisorSdk._instance.api.get(`/reservation/${id}`);
    console.log('RESERVATIONS', data);
    buildingStore.dispatch(setReservations(data.data));
  }
}

export const supervisorSdk = new SupervisorSdk({
  apiUrl: 'http://172.20.10.3:8080',
});
