interface Building {
  _id: string;
  name: string;
  studyroom: Studyroom[];
}

interface Studyroom {
  _id: string;
  name: string;
  image: string;
}
