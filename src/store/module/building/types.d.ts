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

interface StudyroomsGroupByBuilding {
  _id: string;
  studyrooms: Studyroom[];
}

interface Studyroom {
  _id: string;
  name: string;
  image: string;
}
