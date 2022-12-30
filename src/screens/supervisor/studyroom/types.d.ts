interface StudyRoom {
  key: string;
  name: string;
  building: string;
  image: string;
  seats: string;
  timeRange: TimeRange[];
}

interface TimeRange {
  key: string;
  start: string;
  end: string;
  seatsAvailable: string;
}