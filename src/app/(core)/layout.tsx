'use client';
import { ActiveTabProvider, useActiveTab } from '@/contexts/ActiveTabContext';
import { GoToTwentyII } from '@/components/GoToTwentyII';
import { Footer } from '@/components/common/footer';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import '../globals.css';

function CoreLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeTab } = useActiveTab();

  return (
    <div className="lg:max-w-[1510px] md:w-[648px] sm:w-[500px] mx-auto lg:w-full relative">
      <Header />
      <div className="flex  xl:gap-[73px] gap-[50px] mx-auto justify-center relative">
        
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveTabProvider>
      <CoreLayoutContent>{children}</CoreLayoutContent>
    </ActiveTabProvider>
  );
}
