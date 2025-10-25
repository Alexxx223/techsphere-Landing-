import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileX, ArrowLeft, Home } from 'lucide-react';

interface CaseStudyNotFoundProps {
  projectId?: string;
  message?: string;
}

const CaseStudyNotFound: React.FC<CaseStudyNotFoundProps> = ({
  projectId,
  message = "The case study you're looking for doesn't exist or has been moved.",
}) => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <FileX className="w-16 h-16 text-gray-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Case Study Not Found</h1>
          <p className="text-gray-400">
            {message}
          </p>
          {projectId && (
            <p className="text-sm text-gray-500">
              Project ID: {projectId}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Here are some things you can try:
          </p>
          
          <ul className="text-sm text-gray-400 space-y-1 text-left">
            <li>• Check the URL for any typos</li>
            <li>• Browse our portfolio for available case studies</li>
            <li>• Contact us if you believe this is an error</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-teal hover:bg-teal/90 text-black"
          >
            <Link to="/portfolio">
              <Home className="w-4 h-4 mr-2" />
              View Portfolio
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyNotFound;