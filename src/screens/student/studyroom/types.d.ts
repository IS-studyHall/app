interface StudyRoom {
  key: string;
  name: string;
  building: string;
  image: string;
  floor: number;
  seats: number;
  timeRange?: TimeRange[];
}

interface TimeRange {
  key: string;
  start: string;
  end: string;
  seatsAvailable: string;
}
