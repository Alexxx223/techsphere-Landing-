import React, { ReactNode, useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ContentSectionSkeleton } from '@/components/ui/loading-states';

interface CaseStudySectionWrapperProps {
  children: ReactNode;
  sectionName: string;
  loading?: boolean;
  fallbackContent?: ReactNode;
  showRetry?: boolean;
  onRetry?: () => void;
}

const CaseStudySectionWrapper: React.FC<CaseStudySectionWrapperProps> = ({
  children,
  sectionName,
  loading = false,
  fallbackContent,
  showRetry = true,
  onRetry,
}) => {
  const [hasError, setHasError] = useState(false);
  const { handleError, clearError } = useErrorHandler({
    logErrors: true,
    fallbackMessage: `Failed to load ${sectionName} section`,
  });

  // Error boundary-like behavior for functional components
  useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      if (event.error) {
        setHasError(true);
        handleError(event.error);
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setHasError(true);
      handleError(new Error(event.reason));
    };

    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [handleError]);

  const handleRetry = () => {
    setHasError(false);
    clearError();
    onRetry?.();
  };

  // Show loading state
  if (loading) {
    return <ContentSectionSkeleton />;
  }

  // Show error state
  if (hasError) {
    if (fallbackContent) {
      return <>{fallbackContent}</>;
    }

    return (
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
          </div>
          
          <h3 className="text-xl font-semibold mb-4">
            Failed to load {sectionName}
          </h3>
          
          <p className="text-gray-400 mb-6">
            We encountered an issue loading this section. This might be a temporary problem.
          </p>

          {showRetry && (
            <Button
              onClick={handleRetry}
              className="bg-teal hover:bg-teal/90 text-black"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Render children with error catching
  try {
    return <>{children}</>;
  } catch (error) {
    setHasError(true);
    handleError(error as Error);
    return null;
  }
};

export default CaseStudySectionWrapper;