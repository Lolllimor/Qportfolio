import { Footer } from '@/components/common/footer';
import { ProjectCursorProvider } from '@/components/common/ProjectCursor';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProjectCursorProvider>
      <div className="relative mx-auto w-full max-w-[1510px] sm:w-[500px] md:w-[656px] lg:w-full">
        <Header />
        <div className="relative mx-auto flex justify-center gap-[50px] xl:gap-[73px]">
          <Sidebar />
          <div className="w-full min-w-0 max-w-[1014px]">{children}</div>
        </div>
        <Footer />
      </div>
    </ProjectCursorProvider>
  );
}
