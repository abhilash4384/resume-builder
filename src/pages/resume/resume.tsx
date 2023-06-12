import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Hidden,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  educationDetailsAtomState,
  experienceDetailsAtomState,
  userDetailsAtomState,
} from '../../store/app-atoms';
import defaultResume from './default-resume';
import LargeSidebar from './large-sidebar';
import Sidebar from './sidebar';

const actions = [
  { icon: <FileCopyIcon />, name: 'Download JSON file', key: 1 },
  { icon: <PrintIcon />, name: 'Print/Download Resume', key: 2 },
];

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

  const createJSONFile = useCallback(() => {
    // Convert JSON object to a string
    const jsonString = JSON.stringify(resumeDetails, null, 2);

    // Create a Blob object with the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup: Remove the link and revoke the temporary URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [resumeDetails]);

  return (
    <div className="bg-white">
      <main className="resume-container" ref={componentRef}>
        <Sidebar data={isPreview ? defaultResume : resumeDetails} />
        <LargeSidebar data={isPreview ? defaultResume : resumeDetails} />
      </main>
      <Hidden mdUp>
        <div className="row-center h-full">
          <div>
            <Typography variant="h6" align="center" color="GrayText">
              You are resume is ready to download
            </Typography>
            <div className="row-center mt-2 mb-5">
              <Button variant="contained" color="primary" onClick={handlePrint}>
                Dowanload PDF
              </Button>
            </div>

            <Typography variant="h6" align="center" color="GrayText">
              Download JSON file and later import it to autofill the form
            </Typography>
            <div className="row-center my-2">
              <Button
                variant="contained"
                color="primary"
                onClick={createJSONFile}
              >
                Dowanload JSON
              </Button>
            </div>
          </div>
        </div>
      </Hidden>

      <Hidden mdDown>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon icon={<SaveIcon />} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() =>
                action.key === 1 ? createJSONFile() : handlePrint()
              }
            />
          ))}
        </SpeedDial>
      </Hidden>
    </div>
  );
};

export default PrintResumeComponent;
