
import { School, SchoolInput } from '@/types/school';

const API_URL = 'http://localhost:5000/api';

// Add a new school - real API call to backend
export const addSchool = async (schoolData: SchoolInput): Promise<School> => {
  try {
    const response = await fetch(`${API_URL}/schools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(schoolData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add school');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in addSchool:', error);
    throw error;
  }
};

// List schools sorted by proximity - real API call to backend
export const fetchSchools = async (latitude: number, longitude: number): Promise<School[]> => {
  try {
    const response = await fetch(
      `${API_URL}/schools?latitude=${latitude}&longitude=${longitude}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch schools');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in fetchSchools:', error);
    throw error;
  }
};
