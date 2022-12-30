interface Action<T> {
  type: string;
  payload: T;
}

interface Building {
  _id: string;
  name: string;
  coords: Coords[];
}

interface Coords {
  lat: string;
  long: string;
}
