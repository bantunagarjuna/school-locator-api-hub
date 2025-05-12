
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        
        <p className="text-xl text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        
        <div className="text-sm text-muted-foreground border border-border rounded-md p-4 bg-muted/50">
          <code>
            The requested URL <span className="font-semibold">{location.pathname}</span> was not found.
          </code>
        </div>
        
        <div className="pt-4">
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
