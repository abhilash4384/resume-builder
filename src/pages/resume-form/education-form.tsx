import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import educationSchema from '../../schemas/education.schema';
import { educationDetailsAtomState } from '../../store/app-atoms';
import { IEducationFields, IFormFields } from '../../types/resume-model';

const educationFormFields: IFormFields[] = [
  { fieldLable: 'University', fieldName: 'university' },
  { fieldLable: 'College', fieldName: 'college' },
  {
    fieldLable: 'Course Name - BCS/MCA',
    fieldName: 'course_name',
  },
  {
    fieldLable: 'Start Year',
    fieldName: 'start_year',
  },
  {
    fieldLable: 'End Year',
    fieldName: 'end_year',
  },
];

const EducationForm = ({ setExpanded }: { setExpanded: any }) => {
  const [educationDetailsState, setEducationDetailsState] = useAtom(
    educationDetailsAtomState
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<IEducationFields>({
    resolver: yupResolver(educationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const watchFieldArray = watch('education');
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const onSubmit: SubmitHandler<IEducationFields> = (data) => {
    setEducationDetailsState(data);
  };

  useEffect(() => {
    reset(educationDetailsState);
    setExpanded('panel3');
  }, [reset, educationDetailsState]);

  const isAnyEducationFormAvialable = useMemo(
    () => (controlledFields.length > 0 ? true : false),
    [controlledFields]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {controlledFields.map((field, index) => {
          return (
            <Grid
              key={`${index}-edu`}
              container
              spacing={2}
              my={3}
              className="row-center  dashed-border-bottom py-3"
            >
              <Grid item xs={12} className="row-center">
                <p className="text-large">Acedemic Details - {index + 1}</p>
              </Grid>
              {educationFormFields.map(({ fieldLable, fieldName }, i) => {
                const maidenFieldName = `education.${index}.${fieldName}`;
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
                        {errors?.education?.[index]?.[fieldName]?.message ?? ''}
                      </p>
                    </div>
                  </Grid>
                );
              })}

              <Grid item xs={4} className="row-center" key={`delete-${index}`}>
                <div>
                  <Button
                    variant="contained"
                    color="error"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Grid>
            </Grid>
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
                  college: '',
                  course_name: '',
                  end_year: NaN,
                  start_year: NaN,
                  university: '',
                })
              }
            >
              Add Education Details
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

export default EducationForm;
