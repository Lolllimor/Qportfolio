import { Footer } from '@/components/common/footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:max-w-[1510px] md:w-[656px] sm:w-[500px] mx-auto lg:w-full relative">
      <Header />
      <div className="flex  xl:gap-[73px] gap-[50px] mx-auto justify-center relative">
        <Sidebar />
        <div className="w-full max-w-[1014px] min-w-0">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
