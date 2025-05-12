
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { School } from 'lucide-react';
import { addSchool } from '@/services/api';

const formSchema = z.object({
  name: z.string().min(2, { message: 'School name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  latitude: z.coerce.number()
    .min(-90, { message: 'Latitude must be between -90 and 90.' })
    .max(90, { message: 'Latitude must be between -90 and 90.' }),
  longitude: z.coerce.number()
    .min(-180, { message: 'Longitude must be between -180 and 180.' })
    .max(180, { message: 'Longitude must be between -180 and 180.' }),
});

type FormValues = z.infer<typeof formSchema>;

const AddSchool = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await addSchool(data);
      toast.success("School added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error adding school:", error);
      toast.error("Failed to add school. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center space-x-2">
              <School className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Add New School</CardTitle>
            </div>
            <CardDescription className="text-center">
              Fill in the details below to add a new school to the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The full official name of the school
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormDescription>
                        Complete street address with postal code
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" placeholder="e.g., 41.8781" {...field} />
                        </FormControl>
                        <FormDescription>
                          Between -90 and 90
                        </FormDescription>
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
                        <FormDescription>
                          Between -180 and 180
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Adding School..." : "Add School"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 flex justify-center text-sm text-muted-foreground">
            <p>All fields are required to add a new school</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AddSchool;
