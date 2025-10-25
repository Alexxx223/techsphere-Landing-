import { useState, useCallback } from 'react';

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorMessage: string;
  errorCode?: string;
}

export interface ErrorHandlerOptions {
  logErrors?: boolean;
  fallbackMessage?: string;
  onError?: (error: Error) => void;
}

export const useErrorHandler = (options: ErrorHandlerOptions = {}) => {
  const {
    logErrors = true,
    fallbackMessage = 'An unexpected error occurred',
    onError,
  } = options;

  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorMessage: '',
  });

  const handleError = useCallback((error: Error | string, errorCode?: string) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error;
    
    if (logErrors) {
      console.error('Error handled:', errorObj);
    }

    setErrorState({
      hasError: true,
      error: errorObj,
      errorMessage: errorObj.message || fallbackMessage,
      errorCode,
    });

    onError?.(errorObj);
  }, [logErrors, fallbackMessage, onError]);

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorMessage: '',
    });
  }, []);

  const retryWithErrorHandling = useCallback(async (
    asyncFunction: () => Promise<void>,
    retryMessage?: string
  ) => {
    try {
      clearError();
      await asyncFunction();
    } catch (error) {
      handleError(
        error instanceof Error ? error : new Error(retryMessage || 'Retry failed')
      );
    }
  }, [clearError, handleError]);

  return {
    ...errorState,
    handleError,
    clearError,
    retryWithErrorHandling,
  };
};

// Specific error handlers for common case study errors
export const useCaseStudyErrorHandler = () => {
  return useErrorHandler({
    logErrors: true,
    fallbackMessage: 'Failed to load case study content',
    onError: (error) => {
      // You could send this to an error reporting service
      if (process.env.NODE_ENV === 'production') {
        // Example: Sentry.captureException(error);
      }
    },
  });
};

export const useImageErrorHandler = () => {
  return useErrorHandler({
    logErrors: false, // Don't log image errors as they're common
    fallbackMessage: 'Failed to load image',
  });
};

export const useAnimationErrorHandler = () => {
  return useErrorHandler({
    logErrors: true,
    fallbackMessage: 'Animation failed to load',
    onError: (error) => {
      // Disable animations on error to prevent further issues
      if (typeof window !== 'undefined') {
        document.body.classList.add('reduce-motion');
      }
    },
  });
};