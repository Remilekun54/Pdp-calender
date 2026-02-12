import React, { useState } from 'react';
import { Ward } from '../types';

interface AdminPageProps {
  wards: Ward[];
  onSave: (wards: Ward[]) => void;
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ wards, onSave, onBack }) => {
  const [editingWards, setEditingWards] = useState<Ward[]>(wards);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleInputChange = (id: string, field: keyof Ward, value: string | number) => {
    setEditingWards(
      editingWards.map((ward) =>
        ward.id === id ? { ...ward, [field]: value } : ward
      )
    );
  };

  const handleSave = () => {
    onSave(editingWards);
    alert('Meeting details saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black text-[#008751] mb-2">Admin Panel</h2>
            <p className="text-gray-600">Manage ward meeting details and schedules</p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Public View
          </button>
        </div>

        {/* Ward Editor Cards */}
        <div className="space-y-6 mb-8">
          {editingWards.map((ward) => (
            <div
              key={ward.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ward Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Ward Name
                    </label>
                    <input
                      type="text"
                      value={ward.ward_name}
                      onChange={(e) => handleInputChange(ward.id, 'ward_name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Meeting Day */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Meeting Day
                    </label>
                    <select
                      value={ward.meeting_day}
                      onChange={(e) => handleInputChange(ward.id, 'meeting_day', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none"
                    >
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>

                  {/* Meeting Time */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Meeting Time
                    </label>
                    <input
                      type="text"
                      value={ward.meeting_time}
                      onChange={(e) => handleInputChange(ward.id, 'meeting_time', e.target.value)}
                      placeholder="e.g., 5:00 PM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Frequency (weeks)
                    </label>
                    <input
                      type="number"
                      value={ward.frequency_weeks}
                      onChange={(e) => handleInputChange(ward.id, 'frequency_weeks', parseInt(e.target.value))}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Start Date (YYYY-MM-DD)
                    </label>
                    <input
                      type="text"
                      value={ward.start_date}
                      onChange={(e) => handleInputChange(ward.id, 'start_date', e.target.value)}
                      placeholder="2024-01-01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none"
                    />
                  </div>

                  {/* Venue */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={ward.venue}
                      onChange={(e) => handleInputChange(ward.id, 'venue', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008751] focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-4 bg-[#008751] text-white font-bold rounded-lg hover:bg-[#006a40] transition-colors shadow-lg text-lg"
          >
            💾 Save All Changes
          </button>
          <button
            onClick={onBack}
            className="px-6 py-4 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
