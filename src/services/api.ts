
import { School, SchoolInput } from '@/types/school';

// Mock data storage (simulating database)
let schools: School[] = [
  {
    id: 1,
    name: "Central High School",
    address: "123 Education Ave, Springfield, IL 62701",
    latitude: 39.8026,
    longitude: -89.6437,
  },
  {
    id: 2,
    name: "Westside Elementary",
    address: "456 Learning Blvd, Springfield, IL 62702",
    latitude: 39.8107,
    longitude: -89.6589,
  },
  {
    id: 3,
    name: "Southview Academy",
    address: "789 Knowledge St, Springfield, IL 62703",
    latitude: 39.7906,
    longitude: -89.6334,
  }
];

let nextId = 4;

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  return distance;
};

// Add a new school - simulates POST /addSchool
export const addSchool = async (schoolData: SchoolInput): Promise<School> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validate input (should be done more thoroughly in a real backend)
  if (!schoolData.name || !schoolData.address || 
      schoolData.latitude < -90 || schoolData.latitude > 90 ||
      schoolData.longitude < -180 || schoolData.longitude > 180) {
    throw new Error('Invalid school data');
  }
  
  const newSchool: School = {
    ...schoolData,
    id: nextId++
  };
  
  schools.push(newSchool);
  return newSchool;
};

// List schools sorted by proximity - simulates GET /listSchools
export const fetchSchools = async (latitude: number, longitude: number): Promise<School[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Calculate distance for each school and sort by proximity
  const schoolsWithDistance = schools.map(school => {
    const distance = calculateDistance(
      latitude,
      longitude,
      school.latitude,
      school.longitude
    );
    
    return {
      ...school,
      distance
    };
  });
  
  // Sort by distance
  return schoolsWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
};
