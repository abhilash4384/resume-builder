// @ts-nocheck

import { Step, StepLabel, Stepper } from '@mui/material';
import { useAtom } from 'jotai';
import React, { useCallback, useMemo } from 'react';
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

const STEPS: Record<number, React.Component> = {
  0: UserDetailsForm,
  1: EducationForm,
  2: ExperianceForm,
};

const stepperTitles: Record<number, string> = {
  0: 'User Details',
  1: 'Acedemic Details',
  2: 'Experiece Details',
};

const ResumeForm = () => {
  const [activeStep, setActiveStep] = React.useState<number | undefined>(1);
  const navigate = useNavigate();

  const handleChange = (panel: number) => {
    setActiveStep(panel ?? undefined);
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
                setActiveStep(3);
                alert('Experience details form is invalid!');
                return;
              });
            //end exp
          })
          .catch((e) => {
            console.log(e);
            setActiveStep(2);
            alert('Education details form is invalid!');
            return;
          });
      })
      .catch((e) => {
        console.log(e);
        setActiveStep(1);
        alert('User details form is invalid!');
        return;
      });
  }, [educationData, experienceData, navigate, userData]);

  const ActiveComponent = useMemo(() => {
    return STEPS?.[activeStep];
  }, [activeStep]);
  console.log(activeStep, ' typeof = ', typeof activeStep);
  return (
    <main className="row-center">
      <section>
        <div className="mt-5">
          <Stepper activeStep={activeStep} alternativeLabel>
            {Object.keys(STEPS).map((stepKey, index) => (
              <Step key={stepKey}>
                <div
                  role="button"
                  onClick={() => {
                    setActiveStep(index);
                  }}
                >
                  <StepLabel>{stepperTitles[stepKey]}</StepLabel>
                </div>
              </Step>
            ))}
          </Stepper>
          <div>
            {ActiveComponent && (
              <ActiveComponent
                setExpanded={(step) => {
                  if (step === 4) {
                    generateResumeHandler();
                  } else {
                    setActiveStep(step);
                  }
                }}
              />
            )}
          </div>
        </div>
        {/* <div className="my-5 row-center">
          <Button
            color="secondary"
            variant="contained"
            onClick={generateResumeHandler}
          >
            Validate Form & Generate Resume
          </Button>
        </div> */}
      </section>
    </main>
  );
};

export default ResumeForm;
