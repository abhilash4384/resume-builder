// @ts-nocheck
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Hidden,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import ReactDOM from 'react-dom';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import educationSchema from '../../schemas/education.schema';
import experienceSchema from '../../schemas/experience.schema';
import userValidationSchema from '../../schemas/user-details.schema';
import {
  educationDetailsAtomState,
  experienceDetailsAtomState,
  userDetailsAtomState,
} from '../../store/app-atoms';
import {
  IEducationFields,
  IExperienceFields,
  IUserFields,
} from '../../types/resume-model';
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
  const [activeStep, setActiveStep] = useState<number | undefined>(0);
  const navigate = useNavigate();
  const [isOpenImageUpload, setIsOpenImageUpload] = useState<boolean>(false);
  const [experienceData, setExperienceData] = useAtom(
    experienceDetailsAtomState
  );
  const [educationData, setEducationData] = useAtom(educationDetailsAtomState);
  const [userData, setUserData] = useAtom(userDetailsAtomState);
  const [portalPoint, setPortalPoint] = useState<HTMLElement>(
    document.getElementById('portal-root') as HTMLElement
  );

  useEffect(() => {
    setPortalPoint(document.getElementById('portal-root') as HTMLElement);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/json': [],
    },
    onDrop: (acceptedFiles) => {
      const blob = acceptedFiles[0];
      const fileReader = new FileReader();

      fileReader.onload = function (event) {
        const text = event?.target?.result;
        if (text) {
          const content = JSON.parse(text);
          content?.education &&
            setEducationData({
              education: content.education as IEducationFields,
            });
          content?.experiance &&
            setExperienceData({
              experiance: content?.experiance as IExperienceFields,
            });
          delete content?.education;
          delete content?.experiance;
          content && setUserData(content as IUserFields);
          console.log('content = ', content);
        }
      };

      fileReader.readAsText(blob);
      setIsOpenImageUpload(false);
    },
  });

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
      </section>
      {portalPoint &&
        ReactDOM.createPortal(
          <>
            <Button
              variant="contained"
              color="primary"
              title="Fill the form from JSON file"
              onClick={() => setIsOpenImageUpload(true)}
            >
              <Hidden smDown>Import from JSON</Hidden>
              <Hidden smUp>Import</Hidden>
            </Button>
          </>,
          portalPoint
        )}

      <Dialog
        open={isOpenImageUpload}
        onClose={() => setIsOpenImageUpload(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Upload JSON file to autofill the form!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <section className="container">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenImageUpload(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ResumeForm;
