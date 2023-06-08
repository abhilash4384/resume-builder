import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid } from '@mui/material';
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
    setValue,
    getValues,
  } = useForm<IExperienceFields>({
    resolver: yupResolver(experienceSchema),
  });

  const { fields, append, remove, update } = useFieldArray({
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
    setExpanded(false);
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
              setValue={setValue}
              getValues={getValues}
            />
          );
        })}
        <Grid container className="row-center my-2">
          <div className="mx-2">
            <Button
              variant="contained"
              type="button"
              color="success"
              onClick={() =>
                append({
                  company_name: '',
                  duration: '',
                  location: '',
                  projects: [],
                  role_title: '',
                })
              }
            >
              Add Experience
            </Button>
          </div>
        </Grid>
        {isAnyEducationFormAvialable && (
          <Grid container className="row-center mt-5">
            <div className="mx-2">
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>

            <div className="mx-2">
              <Button variant="contained" type="reset" onClick={() => reset()}>
                Reset
              </Button>
            </div>
          </Grid>
        )}
      </form>
    </div>
  );
};

export default ExperienceForm;