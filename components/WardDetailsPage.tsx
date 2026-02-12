import React, { useMemo } from 'react';
import { Ward } from '../types';
import { calculateUpcomingMeetings, formatDate } from '../utils/dateUtils';

interface WardDetailsPageProps {
  ward: Ward;
  onBack: () => void;
}

export const WardDetailsPage: React.FC<WardDetailsPageProps> = ({ ward, onBack }) => {
  const upcomingMeetings = useMemo(() => {
    try {
      return calculateUpcomingMeetings(ward.start_date, ward.frequency_weeks, 6);
    } catch (error) {
      console.error(`Error calculating meetings for ward ${ward.ward_name}:`, error);
      return [];
    }
  }, [ward]);

  const nextMeeting = upcomingMeetings[0];
  const laterMeetings = upcomingMeetings.slice(1);

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#008751] font-bold hover:gap-3 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to All Wards
      </button>

      {/* Ward Header */}
      <div className="bg-gradient-to-r from-[#008751] to-[#006a40] text-white rounded-2xl p-8 shadow-lg">
        <p className="text-green-100 text-sm font-bold uppercase tracking-wider mb-2">Ward Information</p>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">{ward.ward_name}</h1>
        <p className="text-green-100 text-lg">{ward.meeting_day}s at {ward.meeting_time}</p>
      </div>

      {/* Main Next Meeting Highlight */}
      {nextMeeting ? (
        <section className="bg-white border-2 border-[#008751] rounded-2xl p-8 shadow-lg">
          <p className="text-[#008751] text-sm font-bold uppercase tracking-wider mb-3">⭐ Next Scheduled Meeting</p>
          <h2 className="text-4xl font-black text-[#008751] mb-8">{formatDate(nextMeeting.date)}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🕐</span>
                <span className="text-sm font-bold text-gray-600 uppercase">Time</span>
              </div>
              <p className="text-2xl font-black text-[#008751]">{ward.meeting_time}</p>
            </div>

            {/* Venue */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📍</span>
                <span className="text-sm font-bold text-gray-600 uppercase">Venue</span>
              </div>
              <p className="text-lg font-black text-[#008751]">{ward.venue}</p>
            </div>
          </div>

          {/* Meeting Agenda if available */}
          {ward.meetings && ward.meetings.length > 0 && ward.meetings[0]?.agenda && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#008751] mb-3">📋 Agenda</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{ward.meetings[0].agenda}</p>
            </div>
          )}

          {/* Meeting Notes if available */}
          {ward.meetings && ward.meetings.length > 0 && ward.meetings[0]?.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#008751] mb-3">📝 Notes</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{ward.meetings[0].notes}</p>
            </div>
          )}

          {/* Cancelled Status if applicable */}
          {ward.meetings && ward.meetings.length > 0 && ward.meetings[0]?.is_cancelled && (
            <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-red-700 font-bold">⚠️ This meeting has been cancelled</p>
            </div>
          )}
        </section>
      ) : (
        <section className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
          <p className="text-yellow-700 text-sm font-bold uppercase tracking-wider mb-3">⚠️ No Meetings Scheduled</p>
          <p className="text-gray-700">Unable to calculate next meeting date. Please check the ward information.</p>
        </section>
      )}

      {/* Meeting Guidelines */}
      <section className="bg-blue-50 border-l-4 border-[#008751] rounded-xl p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-bold text-[#008751] mb-2">Meeting Information</h3>
            <p className="text-gray-700">
              Meetings are held every <span className="font-bold">{ward.frequency_weeks} week{ward.frequency_weeks > 1 ? 's' : ''}</span>. 
              Your participation is vital for community progress and development. Attendance is encouraged!
            </p>
          </div>
        </div>
      </section>

      {/* Stored Meeting Details */}
      {ward.meetings && ward.meetings.length > 0 && (
        <section>
          <h3 className="text-2xl font-black text-[#008751] mb-6">📅 Scheduled Meeting Details</h3>
          <div className="space-y-4">
            {ward.meetings.map((meeting) => (
              <div
                key={meeting.id}
                className={`bg-white border-2 rounded-xl p-6 shadow-sm ${
                  meeting.is_cancelled ? 'border-red-300 opacity-60' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-1">
                      {new Date(meeting.meeting_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-lg font-black text-[#008751]">
                      {meeting.meeting_time} • {meeting.venue}
                    </p>
                  </div>
                  {meeting.is_cancelled && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                      CANCELLED
                    </span>
                  )}
                </div>

                {meeting.agenda && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Agenda</h4>
                    <p className="text-gray-700 whitespace-pre-wrap text-sm">{meeting.agenda}</p>
                  </div>
                )}

                {meeting.notes && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-600 uppercase mb-2">Notes</h4>
                    <p className="text-gray-700 whitespace-pre-wrap text-sm">{meeting.notes}</p>
                  </div>
                )}

                {!meeting.agenda && !meeting.notes && (
                  <p className="text-gray-500 text-sm italic">No additional details for this meeting</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Future Meetings */}
      <section>
        <h3 className="text-2xl font-black text-[#008751] mb-6">Upcoming Meetings</h3>
        {laterMeetings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {laterMeetings.map((meeting, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-gray-500 font-semibold mb-2">Meeting {idx + 2}</p>
                <p className="text-lg font-black text-[#008751]">{formatDate(meeting.date)}</p>
                <p className="text-sm text-gray-600 mt-2">{ward.meeting_time}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <p className="text-gray-600">No additional meetings to display. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Footer Info */}
      <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
        <p className="text-gray-600 mb-2">
          <span className="font-bold text-[#008751]">Power to the People!</span>
        </p>
        <p className="text-sm text-gray-500">
          Peoples Democratic Party - Akinyele Local Government Area
        </p>
      </div>
    </div>
  );
};
