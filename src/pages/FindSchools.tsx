
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, School, Navigation } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { fetchSchools } from '@/services/api';
import { School as SchoolType } from '@/types/school';

const formSchema = z.object({
  latitude: z.coerce.number()
    .min(-90, { message: 'Latitude must be between -90 and 90.' })
    .max(90, { message: 'Latitude must be between -90 and 90.' }),
  longitude: z.coerce.number()
    .min(-180, { message: 'Longitude must be between -180 and 180.' })
    .max(180, { message: 'Longitude must be between -180 and 180.' }),
});

type FormValues = z.infer<typeof formSchema>;

const FindSchools = () => {
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      const fetchedSchools = await fetchSchools(data.latitude, data.longitude);
      setSchools(fetchedSchools);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      position => {
        form.setValue('latitude', position.coords.latitude);
        form.setValue('longitude', position.coords.longitude);
      },
      error => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location");
      }
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Find Nearby Schools</CardTitle>
            </div>
            <CardDescription className="text-center">
              Enter your location to find schools sorted by proximity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="e.g., 41.8781" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="e.g., -87.6298" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={getCurrentLocation}
                    className="flex items-center gap-2"
                  >
                    <Navigation className="h-4 w-4" />
                    Use My Location
                  </Button>
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search Schools"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {searchPerformed && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <School className="h-6 w-6 text-primary" />
              {schools.length > 0 
                ? `Found ${schools.length} School${schools.length > 1 ? 's' : ''}`
                : "No Schools Found"
              }
            </h2>
            
            {schools.length > 0 ? (
              <div className="space-y-4">
                {schools.map((school) => (
                  <Card key={school.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{school.name}</h3>
                            <p className="text-muted-foreground">{school.address}</p>
                          </div>
                          <div className="bg-primary/10 px-3 py-1 rounded-full text-primary font-medium">
                            {school.distance ? `${school.distance.toFixed(2)} km` : 'N/A'}
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>Coordinates: {school.latitude}, {school.longitude}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="p-4 bg-muted/50 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">School ID: {school.id}</span>
                        <Button variant="outline" size="sm" asChild>
                          <a 
                            href={`https://maps.google.com/?q=${school.latitude},${school.longitude}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            View on Map
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p>No schools found in the database. Try adding some schools first!</p>
                <Button variant="link" asChild className="mt-2">
                  <a href="/add-school">Add a School</a>
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FindSchools;
