
import React from 'react';
import oyo from './images/oyo.png';
import pdp from './images/pdp.png';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, subtitle, onBack }) => {
  return (
    <div className="min-h-screen max-w-md mx-auto flex flex-col bg-gray-50 shadow-2xl">
      {/* Official State and Party Branding Section */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
        {/* PDP Traditional Color Strip */}
        <div className="w-full h-2 flex">
          <div className="flex-1 bg-[#008751]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#E31B23]"></div>
        </div>

        <div className="px-6 py-6 flex items-center justify-between gap-4">
          {/* State and LG Branding */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <img 
                src={oyo} 
                alt="Oyo State Coat of Arms" 
                className="h-14 w-auto object-contain drop-shadow-sm"
              />
              <span className="text-[8px] font-black text-gray-500 uppercase mt-1">Oyo State</span>
            </div>
            
            <div className="h-10 w-px bg-gray-200 mx-1"></div>
            
            <div className="flex flex-col">
              <h3 className="text-[10px] font-black text-[#008751] uppercase leading-none tracking-tight">Akinyele</h3>
              <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mt-0.5">Local Government</p>
            </div>
          </div>

          {/* Prominent PDP Logo (Primary Branding) */}
          <div className="relative group">
            {/* Soft glow effect for prominence */}
            <div className="absolute -inset-2 bg-[#008751]/10 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 p-1 bg-white rounded-full shadow-sm border border-gray-50">
              <img 
                src={pdp} 
                alt="Peoples Democratic Party Logo" 
                className="h-20 w-20 object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="pb-5 px-6 text-center">
          <h2 className="text-[#008751] font-black text-base uppercase tracking-wider">Peoples Democratic Party</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-px w-6 bg-[#E31B23]/30"></div>
            <p className="text-[#E31B23] font-black text-[11px] uppercase tracking-[0.4em]">Power to the People</p>
            <div className="h-px w-6 bg-[#E31B23]/30"></div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 text-[#008751] hover:bg-green-50 rounded-full transition-all active:scale-90"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight text-[#008751] leading-none uppercase">{title}</h1>
            {subtitle && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{subtitle}</p>}
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 relative">
        {/* Subtle Background Watermark */}
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.015] z-0">
           <img 
            src={pdp} 
            alt="" 
            className="w-80 h-80 grayscale" 
           />
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Political Footer */}
      <footer className="p-10 text-center border-t border-gray-100 mt-auto bg-white relative z-10">
        <div className="flex justify-center gap-2 mb-4">
           <div className="w-12 h-1.5 rounded-full bg-[#008751]"></div>
           <div className="w-12 h-1.5 rounded-full bg-gray-100 border border-gray-200"></div>
           <div className="w-12 h-1.5 rounded-full bg-[#E31B23]"></div>
        </div>
        <p className="font-black text-[#008751] text-sm mb-1 uppercase tracking-widest">PDP: Power to the People</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Official Ward Administration Resource</p>
        <p className="text-[9px] text-gray-300 mt-4 uppercase font-medium">Akinyele LGA, Oyo State &copy; 2024</p>
      </footer>
    </div>
  );
};
