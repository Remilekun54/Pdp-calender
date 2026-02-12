import { Ward, Meeting } from '../types';

const API_URL = 'http://localhost:8000/api/wards';

export const fetchWards = async (): Promise<Ward[]> => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) throw new Error('Failed to fetch wards');
    const data = await response.json();
    // Handle both paginated and direct array responses
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error('Error fetching wards:', error);
    return [];
  }
};

export const fetchWardById = async (wardId: string): Promise<Ward | null> => {
  try {
    const response = await fetch(`${API_URL}/${wardId}/`);
    if (!response.ok) throw new Error('Failed to fetch ward');
    return await response.json();
  } catch (error) {
    console.error('Error fetching ward:', error);
    return null;
  }
};

export const fetchWardMeetings = async (wardId: string): Promise<Meeting[]> => {
  try {
    const response = await fetch(`${API_URL}/${wardId}/meetings/`);
    if (!response.ok) throw new Error('Failed to fetch meetings');
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error('Error fetching meetings:', error);
    return [];
  }
};

export const updateWard = async (wardId: string, data: Partial<Ward>): Promise<Ward | null> => {
  try {
    const response = await fetch(`${API_URL}/${wardId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update ward');
    return await response.json();
  } catch (error) {
    console.error('Error updating ward:', error);
    return null;
  }
};
