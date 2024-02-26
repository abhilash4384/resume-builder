// @ts-nocheck

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, SpeedDial, Tooltip } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ExperienceSpecificForm from '../../components/experience/experiece-specific-form';
import experienceSchema from '../../schemas/experience.schema';
import { experienceDetailsAtomState } from '../../store/app-atoms';
import { IExperienceFields } from '../../types/resume-model';

const ExperienceForm = ({ setExpanded }: { setExpanded: any }) => {
  const [experienceDetails, setExperienceDetails] = useAtom(
    experienceDetailsAtomState
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<IExperienceFields>({
    resolver: yupResolver(experienceSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiance',
  });

  const watchFieldArray = watch('experiance');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const onSubmit: SubmitHandler<IExperienceFields> = (data) => {
    setExperienceDetails(data);
    setExpanded(4);
  };

  useEffect(() => {
    reset(experienceDetails);
  }, [reset, experienceDetails]);

  const isAnyEducationFormAvialable = useMemo(
    () => (controlledFields.length > 0 ? true : false),
    [controlledFields]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {controlledFields.map((field, index) => {
          return (
            <ExperienceSpecificForm
              key={`${index}-edu`}
              errors={errors}
              index={index}
              register={register}
              remove={remove}
              control={control}
              projects={field.projects}
              canDeleteExperience={controlledFields.length > 1}
            />
          );
        })}

        {isAnyEducationFormAvialable && (
          <Grid container className="row-center my-5">
            <div className="m-2">
              <Button
                variant="contained"
                type="button"
                onClick={() => setExpanded(1)}
              >
                Previous
              </Button>
            </div>
            <div className="m-2">
              <Button variant="contained" type="reset" onClick={() => reset()}>
                Reset
              </Button>
            </div>
            <div className="m-2">
              <Button variant="contained" type="submit">
                Submit & Next
              </Button>
            </div>
          </Grid>
        )}
      </form>

      <Tooltip title="Add Experience" placement="left">
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={() =>
            append({
              company_name: '',
              duration: '',
              location: '',
              projects: [
                {
                  project_description: '',
                  project_name: '',
                  technologies_used: '',
                  project_link: '',
                  project_link_title: '',
                },
              ],
              role_title: '',
            })
          }
        ></SpeedDial>
      </Tooltip>
    </div>
  );
};

export default ExperienceForm;
