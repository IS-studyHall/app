interface Building {
  _id: string;
  //name: string;
  studyrooms: Studyroom[];
}

interface Studyroom {
  _id: string;
  name: string;
  image: string;
}
