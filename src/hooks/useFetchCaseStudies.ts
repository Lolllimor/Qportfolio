import { useEffect, useState } from 'react';
import { CaseStudy } from '@/types';

export interface UseFetchCaseStudiesReturn {
  caseStudies?: CaseStudy[];
  loading: boolean;
  error?: unknown;
}

export function useFetchCaseStudies(): UseFetchCaseStudiesReturn {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetch('/api/case-studies');

        if (!response.ok) {
          throw new Error('Failed to fetch case studies');
        }

        const data = await response.json();

        if (isMounted) {
          setCaseStudies(data.caseStudies);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { caseStudies, loading, error };
}
