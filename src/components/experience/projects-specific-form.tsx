import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { UseFieldArrayRemove } from 'react-hook-form';
import { IFormFields } from '../../types/resume-model';

type IProjectSpecificProps = {
  parentIndex: number;
  register: any;
  errors: any;
  projectIndex: number;
  maidenFieldName: string;
  removeProject: UseFieldArrayRemove;
};
const projectFormFields: IFormFields[] = [
  { fieldLable: 'Project Name', fieldName: 'project_name' },
  { fieldLable: 'Project Link', fieldName: 'project_link' },
  { fieldLable: 'Project link title', fieldName: 'project_link_title' },
  { fieldLable: 'Technologies - React,Node', fieldName: 'technologies_used' },
  { fieldLable: 'Project Description', fieldName: 'project_description' },
];

const ProjectSpecificForm = ({
  errors,
  parentIndex,
  register,
  projectIndex,
  maidenFieldName,
  removeProject,
}: IProjectSpecificProps) => {
  return (
    <>
      <Grid item xs={12} className="row-center">
        <p className="text-large">Project - {projectIndex + 1}</p>
      </Grid>
      <Grid container>
        {projectFormFields.map(({ fieldLable, fieldName }, i) => {
          const fieldKeyExtractor = `${maidenFieldName}.${projectIndex}.${fieldName}`;

          return (
            <Grid
              item
              xs={4}
              className="row-center"
              key={`${fieldName}-${parentIndex}-${i}`}
            >
              <div>
                <p className="pl-1 text-bold text-grey">{fieldLable}</p>
                <TextField
                  sx={{
                    width: 350,
                  }}
                  variant="filled"
                  size="small"
                  {...register(fieldKeyExtractor as any)}
                />
                <p className="text-error text-capitalize">
                  {errors?.experiance?.[parentIndex]?.projects?.[
                    projectIndex
                  ]?.[fieldName]?.message ?? ''}
                </p>
              </div>
            </Grid>
          );
        })}
        <Grid item xs={4} className="row-center">
          <div>
            <Tooltip title="Delete this project">
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => removeProject(projectIndex)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectSpecificForm;
