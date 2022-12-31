interface StudyRoom {
  _id: string;
  name: string;
  building: string;
  image: string;
  seats: string;
  isactive: boolean;
  timeRange: TimeRange[];
}

interface TimeRange {
  key: string;
  start: string;
  end: string;
  seatsAvailable: string;
}
