import axios, {AxiosInstance} from 'axios';

class StudentSdk {
  private static _instance: StudentSdk;
  private api!: AxiosInstance;
  constructor({apiUrl}: {apiUrl: string}) {
    if (!StudentSdk._instance) {
      StudentSdk._instance = this;
      StudentSdk._instance.api = axios.create({
        baseURL: apiUrl + '/student',
      });
    }
    return StudentSdk._instance;
  }
  async login(username: string, password: string) {
    const data = await StudentSdk._instance.api.post('/login', {
      username,
      password,
    });
    console.log(data);
  }
}

export const studentSdk = new StudentSdk({
  apiUrl: `http://${Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'}:8080`,
});
