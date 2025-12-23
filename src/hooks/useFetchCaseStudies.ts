import { useEffect, useState } from 'react';

import client, { STRAPI_BASE_URL_WITHOUT_API } from '@/lib/strapiClient';
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
        const response = await client.collection('case-studies').find({
          populate: '*',
        });

        const transformedCaseStudies: CaseStudy[] = response.data.map(
          (item: any) => {
            const data = item.attributes || item;

            let imageUrl = '';

            if (data.image?.data) {
              const imageData = Array.isArray(data.image.data)
                ? data.image.data[0]
                : data.image.data;
              if (imageData?.attributes?.url) {
                const baseUrl = STRAPI_BASE_URL_WITHOUT_API;
                imageUrl = imageData.attributes.url.startsWith('http')
                  ? imageData.attributes.url
                  : `${baseUrl}${imageData.attributes.url}`;
              }
            } else if (data.image) {
              const imageData = Array.isArray(data.image)
                ? data.image[0]
                : data.image;
              if (imageData?.url) {
                const baseUrl = STRAPI_BASE_URL_WITHOUT_API;
                imageUrl = imageData.url.startsWith('http')
                  ? imageData.url
                  : `${baseUrl}${imageData.url}`;
              }
            }

            if (!imageUrl && data.imageSrc) {
              imageUrl = data.imageSrc;
            }

            return {
              title: data.title || '',
              description: data.description || '',
              year: data.year || '',
              role: data.role || '',
              imageSrc: imageUrl,
              imageAlt: data.imageAlt || data.title || '',
              linkText: data.linkText || 'Read Case Study',
              url: data.url || undefined,
              reverseLayout: data.reverseLayout || false,
              specialImageRender: data.specialImageRender || false,
              imageContainerClass: data.imageContainerClass || '',
              imageClass: data.imageClass || 'w-full h-auto rounded-2xl',
            };
          }
        );

        if (isMounted) {
          setCaseStudies(transformedCaseStudies);
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
