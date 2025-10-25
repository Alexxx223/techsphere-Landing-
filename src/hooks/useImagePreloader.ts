import { useState, useEffect, useCallback } from 'react';

interface PreloadOptions {
  priority?: 'high' | 'low';
  crossOrigin?: 'anonymous' | 'use-credentials';
}

interface PreloadState {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

export const useImagePreloader = (src: string, options: PreloadOptions = {}) => {
  const [state, setState] = useState<PreloadState>({
    loaded: false,
    error: false,
    loading: false,
  });

  const preloadImage = useCallback(() => {
    if (!src) return;

    setState({ loaded: false, error: false, loading: true });

    const img = new Image();
    
    if (options.crossOrigin) {
      img.crossOrigin = options.crossOrigin;
    }

    img.onload = () => {
      setState({ loaded: true, error: false, loading: false });
    };

    img.onerror = () => {
      setState({ loaded: false, error: true, loading: false });
    };

    img.src = src;
  }, [src, options.crossOrigin]);

  useEffect(() => {
    preloadImage();
  }, [preloadImage]);

  return state;
};

export const preloadImages = (urls: string[], options: PreloadOptions = {}): Promise<void[]> => {
  const promises = urls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      if (options.crossOrigin) {
        img.crossOrigin = options.crossOrigin;
      }

      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.allSettled(promises).then(results => 
    results.map(result => {
      if (result.status === 'rejected') {
        console.warn('Image preload failed:', result.reason);
      }
      return;
    })
  );
};

export const preloadCaseStudyImages = async (caseStudyId: string) => {
  try {
    // Dynamic import to avoid circular dependencies
    const { getCaseStudyById } = await import('@/data/caseStudies');
    const caseStudy = getCaseStudyById(caseStudyId);
    
    if (!caseStudy) return;

    const imagesToPreload = [
      caseStudy.heroImage,
      ...caseStudy.gallery.map(img => img.url),
      ...caseStudy.process.flatMap(step => step.images),
      caseStudy.challengesSolutions.challenge.image,
      caseStudy.challengesSolutions.solution.image,
    ].filter(Boolean);

    await preloadImages(imagesToPreload, { priority: 'high' });
  } catch (error) {
    console.warn('Failed to preload case study images:', error);
  }
};