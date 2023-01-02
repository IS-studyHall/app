import axios, {AxiosInstance} from 'axios';
import {authStore, loginStudent} from '../../store/module/auth';
import {buildingStore, setStudyrooms} from '../../store/module/building';
import {setUser, userStore} from '../../store/module/user';

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
  async getUser() {
    const {data} = await StudentSdk._instance.api.get('/student');
    console.log('USER');
    userStore.dispatch(setUser(data.data));
  }
  async getStudyrooms() {
    const {data} = await StudentSdk._instance.api.get('/studyroom');
    console.log('STUDYROOMS READ', data);
    buildingStore.dispatch(setStudyrooms(data.data));
  }
}

export const studentSdk = new StudentSdk({
  apiUrl: `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:8080`,
});
