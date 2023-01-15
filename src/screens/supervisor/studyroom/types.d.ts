interface StudyRoom {
  _id: string;
  name: string;
  building: string;
  image: string;
  seats: string;
  floor: string;
  isactive: boolean;
  email?: string;
  timeRange: TimeRange[];
}

interface TimeRange {
  key: string;
  start: string;
  end: string;
}
