import React from 'react';
import oyo from './images/oyo.png';
import pdp from './images/pdp.png';

interface WebsiteLayoutProps {
  children: React.ReactNode;
  onAdminClick?: () => void;
}

export const WebsiteLayout: React.FC<WebsiteLayoutProps> = ({ children, onAdminClick }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Branding */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <img src={pdp} alt="PDP Logo" className="h-12 w-12 object-contain" />
                <div>
                  <h1 className="text-xl font-black text-[#008751] leading-none">Akinyele Ward</h1>
                  <p className="text-xs text-gray-500 font-semibold">Meeting Calendar</p>
                </div>
              </div>
            </div>

            {/* Admin Button */}
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="px-6 py-2.5 bg-[#008751] text-white font-semibold rounded-lg hover:bg-[#006a40] transition-colors shadow-md hover:shadow-lg"
              >
                Admin Panel
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#008751] to-[#006a40] text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About</h3>
              <p className="text-green-100 text-sm leading-relaxed">
                Official meeting calendar for all wards in Akinyele Local Government Area under the Peoples Democratic Party umbrella.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="text-green-100 text-sm space-y-2">
                <p>📧 info@akinyele.gov.ng</p>
                <p>📞 +234 (0) 803-123-4567</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <p className="text-green-100 text-sm">
                Akinyele Local Government Area<br/>
                Oyo State, Nigeria
              </p>
            </div>
          </div>

          <div className="border-t border-green-500/30 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-green-100 text-sm">
              &copy; 2026 Akinyele LGA. Power to the People. Developed and Managed by Kavy Ltd (+2348144630829)
            </p>
            <img src={oyo} alt="Oyo State" className="h-8 w-auto mt-4 md:mt-0 opacity-80" />
          </div>
        </div>
      </footer>
    </div>
  );
};
