
import React, { useState, useMemo, useEffect } from 'react';
import { WebsiteLayout } from './components/WebsiteLayout';
import { HomePage } from './components/HomePage';
import { WardDetailsPage } from './components/WardDetailsPage';
import { Ward } from './types';
import { fetchWards, fetchWardById } from './utils/api';

type ViewMode = 'home' | 'ward-details';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedWardId, setSelectedWardId] = useState<string | null>(null);
  const [wardsData, setWardsData] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wards data from Django backend on mount
  useEffect(() => {
    const loadWards = async () => {
      setLoading(true);
      try {
        const data = await fetchWards();
        setWardsData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load ward data. Make sure the backend is reachable and API is available.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadWards();
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && wardsData.find(w => w.id === hash)) {
        setSelectedWardId(hash);
        setViewMode('ward-details');
      } else {
        setViewMode('home');
        setSelectedWardId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [wardsData]);

  const selectedWard = useMemo(
    () => wardsData.find(w => w.id === selectedWardId),
    [selectedWardId, wardsData]
  );

  const handleWardClick = (wardId: string) => {
    window.location.hash = wardId;
  };

  const handleAdminClick = () => {
    // Open Django admin panel in a new tab (relative path works both locally and in production)
    window.open('/admin/', '_blank');
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setViewMode('home');
    setSelectedWardId(null);
  };

  if (loading) {
    return (
      <WebsiteLayout onAdminClick={handleAdminClick}>
        <div className="text-center py-20">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#008751]"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading ward data...</p>
        </div>
      </WebsiteLayout>
    );
  }

  if (error) {
    return (
      <WebsiteLayout onAdminClick={handleAdminClick}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-sm text-gray-600">
            To use this application, please start the Django backend:
          </p>
          <code className="block bg-red-100 p-3 mt-3 rounded text-sm font-mono">
            cd backend && python manage.py runserver
          </code>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#008751] text-white rounded-lg hover:bg-[#006a40] transition-colors"
          >
            Retry
          </button>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout onAdminClick={handleAdminClick}>
      {viewMode === 'ward-details' && selectedWard ? (
        <WardDetailsPage ward={selectedWard} onBack={handleBackToHome} />
      ) : (
        <HomePage wards={wardsData} onWardClick={handleWardClick} />
      )}
    </WebsiteLayout>
  );
};

export default App;
