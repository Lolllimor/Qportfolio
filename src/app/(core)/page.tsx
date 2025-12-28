'use client';
import { ProductComponent } from '@/components/product/Product';
import { useActiveTab } from '@/contexts/ActiveTabContext';
import { Graphics } from '@/components/graphics/Graphics';
import { Gallery } from '@/components/gallery/Gallery';
import Home from '@/components/home/Home';

export default function Page() {
  const { activeTab } = useActiveTab();
  return (
    <>
      {activeTab === 'home' && <Home />}
      {/* {activeTab === 'art' && <Art />} */}
      {activeTab === 'product' && <ProductComponent />}
      {activeTab === 'gallery' && <Gallery />}
      {activeTab === 'graphics' && <Graphics />}
      {/* {activeTab === 'article' && <Article />} */}
    </>
  );
}
