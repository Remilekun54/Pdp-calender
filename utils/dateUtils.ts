
import { UpcomingMeeting } from '../types';

/**
 * Calculates the next N meeting dates based on a start date and bi-weekly frequency.
 */
export const calculateUpcomingMeetings = (
  startDateStr: string,
  frequencyWeeks: number,
  count: number = 4
): UpcomingMeeting[] => {
  const startDate = new Date(startDateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize today to midnight for comparison

  const meetings: UpcomingMeeting[] = [];
  const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
  const intervalInMs = frequencyWeeks * oneWeekInMs;

  // Find the first meeting that is today or in the future
  let currentMeetingDate = new Date(startDate.getTime());
  
  // If the start date is in the future, it's our first candidate
  // Otherwise, skip forward in bi-weekly increments until we hit today or later
  if (currentMeetingDate < now) {
    const diff = now.getTime() - currentMeetingDate.getTime();
    const intervalsPassed = Math.ceil(diff / intervalInMs);
    currentMeetingDate = new Date(currentMeetingDate.getTime() + intervalsPassed * intervalInMs);
  }

  for (let i = 0; i < count; i++) {
    meetings.push({
      date: new Date(currentMeetingDate.getTime()),
      isNext: i === 0
    });
    currentMeetingDate = new Date(currentMeetingDate.getTime() + intervalInMs);
  }

  return meetings;
};

/**
 * Formats a date into a readable string.
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
