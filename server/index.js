
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

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
  return distance.toFixed(2); // Fixed to 2 decimal places
};

// Route handlers

// Home page
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'School Locator',
    active: 'home'
  });
});

// Find Schools page
app.get('/find-schools', (req, res) => {
  res.render('find-schools', {
    title: 'Find Nearby Schools',
    active: 'find',
    schools: [],
    latitude: '',
    longitude: ''
  });
});

// Process find schools form
app.post('/find-schools', (req, res) => {
  const { latitude, longitude } = req.body;
  
  if (!latitude || !longitude) {
    return res.render('find-schools', {
      title: 'Find Nearby Schools',
      active: 'find',
      schools: [],
      latitude: latitude || '',
      longitude: longitude || '',
      error: 'Latitude and longitude are required'
    });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  
  // Validate coordinates
  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.render('find-schools', {
      title: 'Find Nearby Schools',
      active: 'find',
      schools: [],
      latitude: latitude,
      longitude: longitude,
      error: 'Invalid coordinates'
    });
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
  
  res.render('find-schools', {
    title: 'Find Nearby Schools',
    active: 'find',
    schools: sortedSchools,
    latitude,
    longitude
  });
});

// Add School page
app.get('/add-school', (req, res) => {
  res.render('add-school', {
    title: 'Add a School',
    active: 'add'
  });
});

// Process add school form
app.post('/add-school', (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  
  // Validate required fields
  if (!name || !address || !latitude || !longitude) {
    return res.render('add-school', {
      title: 'Add a School',
      active: 'add',
      error: 'All fields are required',
      formData: { name, address, latitude, longitude }
    });
  }
  
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);
  
  // Validate coordinates
  if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.render('add-school', {
      title: 'Add a School',
      active: 'add',
      error: 'Invalid coordinates',
      formData: { name, address, latitude, longitude }
    });
  }
  
  // Create new school
  const newSchool = {
    id: nextId++,
    name,
    address,
    latitude: lat,
    longitude: lon
  };
  
  schools.push(newSchool);
  
  // Redirect with success message
  res.redirect('/add-school?success=true');
});

// API Documentation page
app.get('/api-docs', (req, res) => {
  res.render('api-docs', {
    title: 'API Documentation',
    active: 'api'
  });
});

// API Routes for programmatic access

// GET /api/schools - List schools sorted by distance
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

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    active: ''
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
