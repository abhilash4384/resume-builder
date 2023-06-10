// @ts-nocheck

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@mui/material';
import { useAtom } from 'jotai';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import educationSchema from '../../schemas/education.schema';
import experienceSchema from '../../schemas/experience.schema';
import userValidationSchema from '../../schemas/user-details.schema';
import {
  educationDetailsAtomState,
  experienceDetailsAtomState,
  userDetailsAtomState,
} from '../../store/app-atoms';
import EducationForm from './education-form';
import ExperianceForm from './experiance-form';
import UserDetailsForm from './user-details-form';

const ResumeForm = () => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const navigate = useNavigate();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const [experienceData] = useAtom(experienceDetailsAtomState);
  const [educationData] = useAtom(educationDetailsAtomState);
  const [userData] = useAtom(userDetailsAtomState);

  const generateResumeHandler = useCallback(async () => {
    userValidationSchema
      .validate(userData)
      .then(() => {
        educationSchema
          .validate(educationData)
          .then(() => {
            //start exp
            experienceSchema
              .validate(experienceData)
              .then(() => {
                navigate('/resume');
              })
              .catch((e) => {
                console.log(e);
                setExpanded('panel3');
                alert('Experience details form is invalid!');
                return;
              });
            //end exp
          })
          .catch((e) => {
            console.log(e);
            setExpanded('panel2');
            alert('Education details form is invalid!');
            return;
          });
      })
      .catch((e) => {
        console.log(e);
        setExpanded('panel1');
        alert('User details form is invalid!');
        return;
      });
  }, [educationData, experienceData, navigate, userData]);
  return (
    <main className="row-center">
      <section>
        <div className="row-center">
          <p className="text-title"> Create Resume Form</p>
        </div>

        <div className="mt-5">
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <p className="text-grey text-title">User Details</p>
            </AccordionSummary>
            <AccordionDetails>
              <UserDetailsForm setExpanded={setExpanded} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <p className="text-grey text-title">Acedemic</p>
            </AccordionSummary>
            <AccordionDetails>
              <EducationForm setExpanded={setExpanded} />
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <p className="text-grey text-title">Experience Details</p>
            </AccordionSummary>
            <AccordionDetails>
              <ExperianceForm setExpanded={setExpanded} />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="my-5 row-center">
          <Button variant="contained" onClick={generateResumeHandler}>
            Validate Form & Generate Resume
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ResumeForm;
