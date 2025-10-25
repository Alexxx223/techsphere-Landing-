import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Generic loading spinner
export const LoadingSpinner: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />
  );
};

// Case study header loading skeleton
export const CaseStudyHeaderSkeleton: React.FC = () => {
  return (
    <div className="relative h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center space-y-4 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-24 mx-auto" />
          <div className="h-12 bg-gray-700 rounded w-96 mx-auto" />
          <div className="h-6 bg-gray-700 rounded w-64 mx-auto" />
          <div className="flex justify-center space-x-4 mt-8">
            <div className="h-10 bg-gray-700 rounded w-32" />
            <div className="h-10 bg-gray-700 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Content section loading skeleton
export const ContentSectionSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('py-20 px-4', className)}>
      <div className="container mx-auto max-w-4xl animate-pulse">
        <div className="space-y-6">
          <div className="h-8 bg-gray-700 rounded w-64" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-700 rounded w-4/6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="h-48 bg-gray-700 rounded" />
            <div className="h-48 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Process timeline loading skeleton
export const ProcessTimelineSkeleton: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto max-w-6xl animate-pulse">
        <div className="text-center mb-16">
          <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4" />
          <div className="h-4 bg-gray-700 rounded w-96 mx-auto" />
        </div>
        
        <div className="space-y-12">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-6 bg-gray-700 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-5/6" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="h-64 bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Metrics loading skeleton
export const MetricsSkeleton: React.FC = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl animate-pulse">
        <div className="text-center mb-16">
          <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-gray-700 rounded w-80 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="text-center space-y-4">
              <div className="h-16 bg-gray-700 rounded w-20 mx-auto" />
              <div className="h-4 bg-gray-700 rounded w-24 mx-auto" />
              <div className="h-3 bg-gray-700 rounded w-32 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Image loading placeholder
export const ImageLoadingPlaceholder: React.FC<{ 
  className?: string; 
  showSpinner?: boolean;
}> = ({ className, showSpinner = true }) => {
  return (
    <div className={cn(
      'bg-gray-800 flex items-center justify-center',
      className
    )}>
      {showSpinner && <LoadingSpinner className="text-gray-600" />}
    </div>
  );
};

// Full page loading state for case studies
export const CaseStudyPageLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <CaseStudyHeaderSkeleton />
      <ContentSectionSkeleton />
      <ProcessTimelineSkeleton />
      <ContentSectionSkeleton className="bg-gray-900" />
      <MetricsSkeleton />
    </div>
  );
};