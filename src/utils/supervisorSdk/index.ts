import axios, {AxiosInstance} from 'axios';
import {loginSupervisor, authStore} from '../../store/module/auth';
import {
  buildingStore,
  setBuildings,
  setStudyroom,
  setStudyrooms,
} from '../../store/module/building';

class SupervisorSdk {
  private static _instance: SupervisorSdk;
  private api!: AxiosInstance;
  constructor({apiUrl}: {apiUrl: string}) {
    if (!SupervisorSdk._instance) {
      SupervisorSdk._instance = this;
      SupervisorSdk._instance.api = axios.create({
        baseURL: apiUrl,
      });
    }
    return SupervisorSdk._instance;
  }
  async login(email: string, password: string) {
    const {data} = await SupervisorSdk._instance.api.post(
      '/organization/login',
      {
        email,
        password,
      },
    );
    SupervisorSdk._instance.api.defaults.headers.common.Authorization =
      data.data.token;
    console.log('SUPERVISOR LOGIN');
    authStore.dispatch(loginSupervisor(data.data));
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
    await SupervisorSdk._instance.api.post('/studyroom/create', {
      name,
      building,
      floor,
      seats,
      image,
    });
    console.log('STUDYROOM CREATE');
  }

  async getStudyrooms() {
    const {data} = await SupervisorSdk._instance.api.get(
      '/studyroom/supervisor',
    );
    console.log('STUDYROOMS READ', data);
    buildingStore.dispatch(setStudyrooms(data.data));
  }

  async getStudyroom(id: string) {
    console.log(id);
    const {data} = await SupervisorSdk._instance.api.get(`/studyroom/${id}`);
    buildingStore.dispatch(setStudyroom(data.data));
    console.log('STUDYROOM READ', data);
  }

  async deleteStudyroom(id: string) {
    console.log('delete');
    await SupervisorSdk._instance.api.delete(`/studyroom/${id}`);
    console.log('STUDYROOM DELETE', id);
  }
}

export const supervisorSdk = new SupervisorSdk({
  apiUrl: 'http://localhost:8080',
});
