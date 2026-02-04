
import React, { useState, useMemo, useEffect } from 'react';
import { WARDS_DATA } from './constants';
import { Layout } from './components/Layout';
import { WardCard } from './components/WardCard';
import { calculateUpcomingMeetings, formatDate } from './utils/dateUtils';
import { Ward } from './types';

const App: React.FC = () => {
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);

  // Sync state with URL hash for basic routing without path manipulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setSelectedWardId(hash);
      } else {
        setSelectedWardId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const selectedWard = useMemo(() => 
    WARDS_DATA.find(w => w.id === selectedWardId), 
    [selectedWardId]
  );

  const upcomingMeetings = useMemo(() => {
    if (!selectedWard) return [];
    return calculateUpcomingMeetings(selectedWard.start_date, selectedWard.frequency_weeks);
  }, [selectedWard]);

  const handleSelectWard = (id: string) => {
    window.location.hash = id;
  };

  const handleBack = () => {
    window.location.hash = '';
  };

  if (selectedWard) {
    const nextMeeting = upcomingMeetings[0];
    const laterMeetings = upcomingMeetings.slice(1);

    return (
      <Layout 
        title={selectedWard.ward_name} 
        onBack={handleBack}
      >
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Main Next Meeting Highlight - PDP Green Theme */}
          <section className="bg-[#008751] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
            {/* Background PDP Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#E31B23] opacity-30 -mr-8 -mt-8 rounded-full"></div>
            
            <p className="text-green-100 text-sm font-medium uppercase tracking-wider mb-2">Next Scheduled Meeting</p>
            <h2 className="text-3xl font-extrabold leading-tight">
              {formatDate(nextMeeting.date)}
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white/20 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-100 font-medium">Time</p>
                  <p className="text-lg font-semibold">{selectedWard.meeting_time}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white/20 p-1.5 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-green-100 font-medium">Venue</p>
                  <p className="text-lg font-semibold">{selectedWard.venue}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Subsequent Dates */}
          <section>
            <h3 className="text-[#008751] font-bold mb-4 px-1 border-l-4 border-[#E31B23] pl-3">Future Meeting Dates</h3>
            <div className="space-y-3">
              {laterMeetings.map((meeting, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
                  <p className="text-gray-700 font-medium">{formatDate(meeting.date)}</p>
                  <span className="text-xs text-[#008751] font-bold bg-green-50 px-2 py-1 rounded">{selectedWard.meeting_time}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-2 text-[#008751] mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <h4 className="text-sm font-bold uppercase tracking-tight text-[#008751]">Meeting Guidelines</h4>
            </div>
            <p className="text-sm text-green-800">
              Meetings occur every <span className="font-bold">{selectedWard.frequency_weeks} weeks</span>. Attendance is vital for community progress. Power to the People!
            </p>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Akinyele Ward Meetings" 
      subtitle="Select your ward to see meeting dates"
    >
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {WARDS_DATA.map((ward) => (
          <WardCard 
            key={ward.id} 
            ward={ward} 
            onClick={() => handleSelectWard(ward.id)} 
          />
        ))}
      </div>
      
      <div className="mt-10 bg-[#008751]/5 border border-[#008751]/10 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31B23]/5 -mr-16 -mt-16 rounded-full"></div>
        <h4 className="text-[#008751] font-bold mb-2">PDP Administration</h4>
        <p className="text-gray-600 text-sm leading-relaxed relative z-10">
          This digital calendar is provided to ensure all party members and residents stay informed. Contact your Ward Chairperson for venue changes or specific agenda details.
        </p>
      </div>
    </Layout>
  );
};

export default App;
