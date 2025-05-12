
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Code, Database, Server } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ApiDocs = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">API Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Integrate school location data into your applications
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            This page documents the API endpoints available in this application. In a real production environment, these would connect to an actual Node.js/Express.js backend with MySQL database.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Schema
            </CardTitle>
            <CardDescription>
              The database structure used for managing school data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-md p-4 overflow-auto">
              <pre className="text-sm">
{`CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="add-school">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-school">Add School API</TabsTrigger>
            <TabsTrigger value="list-schools">List Schools API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="add-school" className="space-y-4">
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Add School API
                </CardTitle>
                <CardDescription>
                  POST /addSchool
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="text-muted-foreground">
                    This endpoint allows you to add a new school to the database with validation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Request Body</h3>
                  <div className="bg-muted rounded-md p-4 overflow-auto mt-2">
                    <pre className="text-sm">
{`{
  "name": "Example School",
  "address": "123 Education St, City, State, ZIP",
  "latitude": 41.8781,
  "longitude": -87.6298
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Response</h3>
                  <div className="bg-muted rounded-md p-4 overflow-auto mt-2">
                    <pre className="text-sm">
{`{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Example School",
    "address": "123 Education St, City, State, ZIP",
    "latitude": 41.8781,
    "longitude": -87.6298
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Code Example</h3>
                  <div className="bg-muted rounded-md p-4 overflow-auto mt-2">
                    <pre className="text-sm">
{`// JavaScript fetch example
const addSchool = async (schoolData) => {
  const response = await fetch('/addSchool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(schoolData)
  });

  if (!response.ok) {
    throw new Error('Failed to add school');
  }

  return response.json();
};`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list-schools" className="space-y-4">
            <Card>
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  List Schools API
                </CardTitle>
                <CardDescription>
                  GET /listSchools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="text-muted-foreground">
                    This endpoint returns a list of schools sorted by proximity to the provided coordinates.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Query Parameters</h3>
                  <div className="bg-muted rounded-md p-4 overflow-auto mt-2">
                    <pre className="text-sm">
{`/listSchools?latitude=41.8781&longitude=-87.6298`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Response</h3>
                  <div className="bg-muted rounded-md p-4 overflow-auto mt-2">
                    <pre className="text-sm">
{`{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "Lincoln High School",
      "address": "456 Learning Ave, City, State, ZIP",
      "latitude": 41.8807,
      "longitude": -87.6278,
      "distance": 0.32 // distance in kilometers
    },
    {
      "id": 1,
      "name": "Example School",
      "address": "123 Education St, City, State, ZIP",
      "latitude": 41.8781,
      "longitude": -87.6298,
      "distance": 0.74
    }
    // More schools sorted by distance...
  ]
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Distance Calculation</h3>
                  <p className="text-muted-foreground mb-2">
                    Schools are sorted based on the Haversine formula, which calculates the great-circle distance between two points on a sphere:
                  </p>
                  <div className="bg-muted rounded-md p-4 overflow-auto">
                    <pre className="text-sm">
{`// MySQL implementation example
SELECT 
  id, name, address, latitude, longitude,
  6371 * ACOS(
    COS(RADIANS(?)) * 
    COS(RADIANS(latitude)) * 
    COS(RADIANS(longitude) - RADIANS(?)) + 
    SIN(RADIANS(?)) * 
    SIN(RADIANS(latitude))
  ) AS distance 
FROM schools 
ORDER BY distance ASC;`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Code Example</h3>
                  <div className="bg-muted rounded-md p-4 overflow-auto mt-2">
                    <pre className="text-sm">
{`// JavaScript fetch example
const fetchSchools = async (lat, lng) => {
  const response = await fetch(
    \`/listSchools?latitude=\${lat}&longitude=\${lng}\`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch schools');
  }

  return response.json();
};`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Implementation Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This educational application demonstrates the API structure for a Node.js/Express.js backend with MySQL database integration. In a production environment, you would need to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
              <li>Set up a Node.js server with Express.js</li>
              <li>Configure MySQL database with proper security measures</li>
              <li>Implement robust input validation and error handling</li>
              <li>Add authentication and rate limiting</li>
              <li>Consider HTTPS for secure communication</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ApiDocs;
