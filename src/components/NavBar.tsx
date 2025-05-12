
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <MapPin className="h-6 w-6" />
          <span className="text-xl font-bold">School Locator API Hub</span>
        </Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline font-medium">Home</Link>
          <Link to="/add-school" className="hover:underline font-medium">Add School</Link>
          <Link to="/find-schools" className="hover:underline font-medium">Find Schools</Link>
          <Link to="/api-docs" className="hover:underline font-medium">API Docs</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
