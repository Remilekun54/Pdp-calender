import React, { useMemo } from 'react';
import { Ward, UpcomingMeeting } from '../types';
import { calculateUpcomingMeetings, formatDate } from '../utils/dateUtils';

interface HomePageProps {
  wards: Ward[];
  onWardClick: (wardId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ wards, onWardClick }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-16 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-[#008751] mb-4">
            Akinyele Ward Meetings
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about your local ward meetings. Power to the People!
          </p>
        </div>

        {/* PDP Theme Box */}
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#008751] to-[#006a40] text-white rounded-2xl p-8 text-center shadow-lg">
          <p className="text-lg font-semibold mb-2">Peoples Democratic Party</p>
          <p className="text-3xl font-black tracking-wider">POWER TO THE PEOPLE</p>
          <div className="flex justify-center gap-3 mt-4">
            <div className="h-1 w-12 bg-[#E31B23] rounded-full"></div>
            <div className="h-1 w-12 bg-white/50 rounded-full"></div>
            <div className="h-1 w-12 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Ward Cards Grid */}
      <section>
        <h2 className="text-3xl font-black text-[#008751] mb-8">Select Your Ward</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wards.map((ward) => (
            <WardCardBig
              key={ward.id}
              ward={ward}
              onClick={() => onWardClick(ward.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

interface WardCardBigProps {
  ward: Ward;
  onClick: () => void;
}

const WardCardBig: React.FC<WardCardBigProps> = ({ ward, onClick }) => {
  const upcomingMeetings = useMemo(() => {
    try {
      return calculateUpcomingMeetings(ward.start_date, ward.frequency_weeks, 1);
    } catch (error) {
      console.error(`Error calculating meetings for ward ${ward.ward_name}:`, error);
      return [];
    }
  }, [ward]);

  const nextMeeting = upcomingMeetings[0];

  return (
    <button
      onClick={onClick}
      className="text-left bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#008751] hover:shadow-xl transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#008751] focus:ring-offset-2"
    >
      <div className="mb-4">
        <h3 className="text-2xl font-black text-[#008751] mb-1">{ward.ward_name}</h3>
        <p className="text-sm text-gray-500 font-semibold">{ward.meeting_day}s</p>
      </div>

      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-lg">⏰</span>
          <span className="font-semibold">{ward.meeting_time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-lg">📍</span>
          <span className="font-semibold text-sm">{ward.venue}</span>
        </div>
      </div>

      {nextMeeting && (
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <p className="text-xs text-gray-600 font-bold mb-1">NEXT MEETING</p>
          <p className="text-lg font-black text-[#008751]">
            {formatDate(nextMeeting.date)}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 text-[#008751] font-bold text-sm">
        View Details
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
        </svg>
      </div>
    </button>
  );
};
