
export interface Meeting {
  id: string;
  meeting_date: string; // ISO format: YYYY-MM-DD
  meeting_time: string;
  venue: string;
  agenda?: string;
  notes?: string;
  is_cancelled: boolean;
}

export interface Ward {
  id: string;
  ward_name: string;
  meeting_day: string;
  meeting_time: string;
  venue: string;
  frequency_weeks: number;
  start_date: string; // ISO format: YYYY-MM-DD
  ward_admin?: string;
  meetings?: Meeting[];
  created_at?: string;
  updated_at?: string;
}

export interface UpcomingMeeting {
  date: Date;
  isNext: boolean;
}
