import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import defaultProfile from '../../assets/profile.jpg';
import IResume from '../../types/resume-model';

const Sidebar = ({ data }: { data: IResume }) => {
  const [isOpenImageUpload, setIsOpenImageUpload] = useState<boolean>(false);

  const [file, setFile] = useState<any>();
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      setIsOpenImageUpload(false);
    },
  });

  return (
    <section className="resume-sidebar-section">
      <div role="button" onClick={() => setIsOpenImageUpload(true)}>
        <img className="progile-img" src={file?.preview ?? defaultProfile} />
      </div>

      <div className="my-5">
        <div className="sidebar-section-title my-5">
          <p className="text-title ">Skills</p>
        </div>

        {data.skills.split(',').map((skill: string) => {
          return (
            <div className="row-center py-2" key={skill}>
              <div className="sidebar-void-contact-container" />
              <div className="sidebar-filled-contact-container">
                <span className="text-capitalize pl-1">{skill?.trim()}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sidebar-section-title">
        <p className="text-title">Education</p>
      </div>

      {data.education.map((edu, index) => {
        return (
          <div className="sidebar-section-subtitle" key={index}>
            <p className="text-subtitle text-light-grey text-italic py-1">
              {edu.course_name}
            </p>
            <p>
              {edu.start_year} - {edu.end_year}
            </p>
            <p>{edu.university}</p>
            <p>{edu.college}</p>
          </div>
        );
      })}

      <Dialog
        open={isOpenImageUpload}
        onClose={() => setIsOpenImageUpload(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Upload Image</DialogTitle>
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
    </section>
  );
};

export default Sidebar;
