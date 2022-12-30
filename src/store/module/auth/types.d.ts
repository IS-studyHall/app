interface Action<T> {
  type: string;
  payload: T;
}

interface User {
  email: string;
  username: string;
  token: string;
}
