
import { CaseStudyCard } from './CaseStudyCard';
import { caseStudies } from '../data';

export const CaseStudy = () => {
  return (
    <div className="flex flex-col gap-14 w-full max-w-[850px] xl:max-w-[1014px] mx-auto mb-20 pt-12 lg:pt-[67px] xl:pt-6">
      {caseStudies && caseStudies.map((caseStudy, index) => (
        <CaseStudyCard key={index} caseStudy={caseStudy} />
      ))}
    </div>
  );
};
