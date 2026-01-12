import { NextRequest, NextResponse } from 'next/server';
import client, { STRAPI_BASE_URL_WITHOUT_API } from '@/lib/strapiServer';
import { CaseStudy } from '@/types';

export async function GET(request: NextRequest) {
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

    return NextResponse.json({ caseStudies: transformedCaseStudies });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}
