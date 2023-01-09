interface TimeRange {
  key: string;
  start: string;
  end: string;
}
interface AssignedSeat {
  _id: TimeRange;
  count: number;
}
