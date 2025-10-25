import { useState, useEffect, useCallback } from 'react';
import { getCaseStudyById } from '@/data/caseStudies';
import { preloadCaseStudyImages } from '@/hooks/useImagePreloader';
import { CaseStudy } from '@/types/caseStudy';

interface PreloadState {
  data: CaseStudy | null;
  loading: boolean;
  error: string | null;
  imagesLoaded: boolean;
}

export const useCaseStudyPreloader = (projectId: string | undefined) => {
  const [state, setState] = useState<PreloadState>({
    data: null,
    loading: true,
    error: null,
    imagesLoaded: false,
  });

  const preloadCaseStudy = useCallback(async () => {
    if (!projectId) {
      setState(prev => ({ ...prev, loading: false, error: 'Project ID is required' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      // Load case study data
      const caseStudy = getCaseStudyById(projectId);
      
      if (!caseStudy) {
        setState(prev => ({ ...prev, loading: false, error: 'Case study not found' }));
        return;
      }

      setState(prev => ({ ...prev, data: caseStudy }));

      // Preload images in the background
      preloadCaseStudyImages(projectId)
        .then(() => {
          setState(prev => ({ ...prev, imagesLoaded: true }));
        })
        .catch(error => {
          console.warn('Failed to preload images:', error);
          // Don't set error state for image preloading failures
          setState(prev => ({ ...prev, imagesLoaded: true }));
        });

      setState(prev => ({ ...prev, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load case study',
      }));
      console.error('Error loading case study:', error);
    }
  }, [projectId]);

  useEffect(() => {
    preloadCaseStudy();
  }, [preloadCaseStudy]);

  return state;
};

// Preload next/previous case studies for faster navigation
export const useAdjacentCaseStudyPreloader = (
  nextProjectId?: string,
  previousProjectId?: string
) => {
  useEffect(() => {
    const preloadAdjacent = async () => {
      const preloadPromises = [];

      if (nextProjectId) {
        preloadPromises.push(preloadCaseStudyImages(nextProjectId));
      }

      if (previousProjectId) {
        preloadPromises.push(preloadCaseStudyImages(previousProjectId));
      }

      if (preloadPromises.length > 0) {
        try {
          await Promise.allSettled(preloadPromises);
        } catch (error) {
          console.warn('Failed to preload adjacent case studies:', error);
        }
      }
    };

    // Delay preloading to not interfere with current page loading
    const timeoutId = setTimeout(preloadAdjacent, 2000);
    return () => clearTimeout(timeoutId);
  }, [nextProjectId, previousProjectId]);
};