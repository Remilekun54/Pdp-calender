
import React from 'react';
import { Ward } from '../types';

interface WardCardProps {
  ward: Ward;
  onClick: () => void;
}

export const WardCard: React.FC<WardCardProps> = ({ ward, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-xl p-5 hover:border-[#008751] hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#008751]"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-[#008751]">{ward.ward_name}</h3>
          <p className="text-sm text-gray-500">{ward.meeting_day}s @ {ward.meeting_time}</p>
        </div>
        <div className="text-[#008751]/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </button>
  );
};
