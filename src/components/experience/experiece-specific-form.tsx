import { Button, Grid, TextField } from '@mui/material';
import {
  Control,
  UseFormGetValues,
  UseFormSetValue,
  useFieldArray,
} from 'react-hook-form';
import {
  IExperienceFields,
  IFormFields,
  IProjects,
} from '../../types/resume-model';
import ProjectSpecificForm from './projects-specific-form';

const experienceFormFields: IFormFields[] = [
  { fieldLable: 'Company Name', fieldName: 'company_name' },
  { fieldLable: 'Role Title-Senior Engineer', fieldName: 'role_title' },
  {
    fieldLable: 'Location',
    fieldName: 'location',
  },
  {
    fieldLable: 'Duration eg: 2016 - Till Date',
    fieldName: 'duration',
  },

  {
    fieldLable: 'Projects',
    fieldName: 'projects',
  },
];

type IExperienceProps = {
  index: number;
  errors: any;
  register: any;
  remove: (index?: number | number[] | undefined) => void;
  projects: IProjects[];
  control: Control<IExperienceFields, any>;
  getValues: UseFormGetValues<IExperienceFields>;
  setValue: UseFormSetValue<IExperienceFields>;
};

const ExperienceSpecificForm = ({
  errors,
  index,
  register,
  remove,
  projects,
  control,
  setValue,
  getValues,
}: IExperienceProps) => {
  const {
    fields: projectFields,
    remove: removeProject,
    append: appendProject,
  } = useFieldArray({
    control,
    name: `experiance.${index}.projects`,
    // name: `test[${nestIndex}].nestedArray`
  });

  return (
    <Grid
      container
      spacing={2}
      my={3}
      className="row-center  dashed-border-bottom py-3"
    >
      <Grid item xs={12} className="row-center">
        <p className="text-large">Experience Details - {index + 1}</p>
      </Grid>
      {experienceFormFields.map(({ fieldLable, fieldName }, i) => {
        const maidenFieldName = `experiance.${index}.${fieldName}`;
        if (fieldName === 'projects') {
          return projects?.map((project, pIndex) => {
            return (
              <ProjectSpecificForm
                key={`${pIndex}-project-${index}`}
                parentIndex={index}
                register={register}
                errors={errors}
                projectIndex={pIndex}
                maidenFieldName={`experiance.${index}.projects`}
                removeProject={removeProject}
              />
            );
          });
        } else {
          return (
            <Grid
              item
              xs={4}
              className="row-center"
              key={`${fieldName}-${index}-${i}`}
            >
              <div>
                <p className="pl-1 text-bold text-grey">{fieldLable}</p>
                <TextField
                  sx={{
                    width: 350,
                  }}
                  variant="filled"
                  size="small"
                  {...register(maidenFieldName as any)}
                />
                <p className="text-error text-capitalize">
                  {errors?.experiance?.[index]?.[fieldName]?.message ?? ''}
                </p>
              </div>
            </Grid>
          );
        }
      })}

      <Grid item xs={4} className="row-center" key={`delete-${index}`}>
        <div className="mx-2">
          <Button
            variant="contained"
            color="success"
            type="button"
            onClick={() => {
              appendProject({
                project_name: '',
                project_link: '',
                project_link_title: '',
                technologies_used: '',
                project_description: '',
              });
            }}
          >
            Add Project
          </Button>
        </div>
        <div className="mx-2">
          <Button
            variant="contained"
            color="error"
            type="button"
            onClick={() => remove(index)}
          >
            Remove Experience
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default ExperienceSpecificForm;
