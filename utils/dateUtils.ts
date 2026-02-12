
import { UpcomingMeeting } from '../types';

/**
 * Safely parse a date string in YYYY-MM-DD format
 */
const parseIsoDate = (dateStr: string | Date): Date => {
  if (dateStr instanceof Date) {
    return dateStr;
  }

  if (typeof dateStr !== 'string') {
    throw new Error(`Invalid date type: ${typeof dateStr}`);
  }

  // Handle ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
  const isoMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!isoMatch) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  const [, yearStr, monthStr, dayStr] = isoMatch;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // Create date in local timezone (not UTC)
  const date = new Date(year, month - 1, day, 0, 0, 0, 0);
  
  // Validate the date
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date values: ${year}-${month}-${day}`);
  }

  return date;
};

/**
 * Calculates the next N meeting dates based on a start date and bi-weekly frequency.
 */
export const calculateUpcomingMeetings = (
  startDateStr: string | Date,
  frequencyWeeks: number,
  count: number = 4
): UpcomingMeeting[] => {
  try {
    if (!startDateStr || !frequencyWeeks) {
      console.warn('Missing startDateStr or frequencyWeeks:', { startDateStr, frequencyWeeks });
      return [];
    }

    const startDate = parseIsoDate(startDateStr);
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
  } catch (error) {
    console.error('Error calculating upcoming meetings:', error, { startDateStr, frequencyWeeks });
    return [];
  }
};

/**
 * Formats a date into a readable string.
 */
export const formatDate = (date: Date | string): string => {
  try {
    const dateObj = parseIsoDate(date);
    
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error, { date });
    // Fallback: return the string as-is or a default message
    return typeof date === 'string' ? date : 'Invalid Date';
  }
};
