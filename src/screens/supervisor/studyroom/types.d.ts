interface StudyRoom {
  _id: string;
  name: string;
  building: string;
  image: string;
  seats: string;
  floor: string;
  isactive: boolean;
  timeRange: TimeRange[];
}

interface TimeRange {
  key: string;
  start: string;
  end: string;
}
