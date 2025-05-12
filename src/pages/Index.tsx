
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { MapPin, School, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16 space-y-6">
          <h1 className="text-5xl font-bold text-primary">School Location API Hub</h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Easily manage school data and find educational institutions near you with our powerful API tools
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link to="/find-schools">Find Schools Nearby</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/api-docs">API Documentation</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <School className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle>Add Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Easily add new schools with our simple form. Include name, address, and precise coordinates.
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/add-school">Add a School <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle>Find Nearby Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Locate educational institutions near you, sorted by distance for easy decision-making.
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/find-schools">Find Schools <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 mx-auto text-primary mb-2" />
                <CardTitle>API Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Access our comprehensive API documentation to integrate school data into your applications.
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="ghost">
                  <Link to="/api-docs">View API Docs <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-accent rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start managing school locations and implementing proximity-based search in your applications today.
          </p>
          <Button asChild size="lg">
            <Link to="/add-school">Add Your First School</Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
