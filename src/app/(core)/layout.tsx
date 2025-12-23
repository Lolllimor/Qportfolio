import { ActiveTabProvider } from '@/contexts/ActiveTabContext';
import { Footer } from '@/components/common/footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import '../globals.css';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveTabProvider>
      <div className="lg:max-w-[1510px] md:w-[648px] sm:w-[500px] mx-auto lg:w-full relative">
        <Header />
        <div className="flex  xl:gap-[73px] gap-[50px] mx-auto justify-center ">
          <Sidebar />
          {children}
        </div>
        <Footer />
      </div>
    </ActiveTabProvider>
  );
}
