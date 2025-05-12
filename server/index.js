
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app after build
app.use(express.static(path.join(__dirname, '../dist')));

// In-memory database (could be replaced with a real DB like MongoDB or MySQL)
let schools = [
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
const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

// API Routes

// GET /api/schools - List all schools with distance calculation
app.get('/api/schools', (req, res) => {
  const { latitude, longitude } = req.query;
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  
  // Validate coordinates
  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }
  
  // Calculate distance for each school and sort by proximity
  const schoolsWithDistance = schools.map(school => {
    const distance = calculateDistance(
      lat,
      lon,
      school.latitude,
      school.longitude
    );
    
    return {
      ...school,
      distance
    };
  });
  
  // Sort by distance
  const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  
  res.json(sortedSchools);
});

// POST /api/schools - Add a new school
app.post('/api/schools', (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  
  // Validate required fields
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Validate coordinates
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }
  
  // Create new school
  const newSchool = {
    id: nextId++,
    name,
    address,
    latitude,
    longitude
  };
  
  schools.push(newSchool);
  res.status(201).json(newSchool);
});

// Catch-all handler for all other requests to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
