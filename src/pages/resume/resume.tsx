import { useAtom } from 'jotai';
import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  educationDetailsAtomState,
  experienceDetailsAtomState,
  userDetailsAtomState,
} from '../../store/app-atoms';
import defaultResume from './default-resume';
import LargeSidebar from './large-sidebar';
import Sidebar from './sidebar';

const PrintResumeComponent = ({ isPreview }: { isPreview: boolean }) => {
  const componentRef = useRef<any>();
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });

  const [experienceData] = useAtom(experienceDetailsAtomState);
  const [educationData] = useAtom(educationDetailsAtomState);
  const [userData] = useAtom(userDetailsAtomState);

  const resumeDetails = useMemo(
    () => ({ ...userData, ...educationData, ...experienceData }),
    [educationData, experienceData, userData]
  );

  console.log(resumeDetails);

  return (
    <div>
      <main className="resume-container" ref={componentRef}>
        <Sidebar data={isPreview ? defaultResume : resumeDetails} />
        <LargeSidebar data={isPreview ? defaultResume : resumeDetails} />
      </main>
      <div className="row-center my-2">
        <button className="btn-primary" onClick={handlePrint}>
          Print Resume
        </button>
      </div>
    </div>
  );
};

export default PrintResumeComponent;
