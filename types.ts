
export interface Ward {
  id: string;
  ward_name: string;
  meeting_day: string;
  meeting_time: string;
  venue: string;
  frequency_weeks: number;
  start_date: string; // ISO format: YYYY-MM-DD
}

export interface UpcomingMeeting {
  date: Date;
  isNext: boolean;
}
