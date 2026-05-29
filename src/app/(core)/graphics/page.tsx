import { Graphics } from '@/components/graphics/Graphics';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Graphics',
  description:
    'Visual design work including branding, posters, and graphic design projects by Quadri Morin.',
  path: '/graphics',
});

export default function GraphicsPage() {
  return <Graphics />;
}
