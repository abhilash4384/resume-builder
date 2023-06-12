// @ts-nocheck

import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
  Button,
  Grid,
  IconButton,
  SpeedDial,
  TextField,
  Tooltip,
} from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
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
    setExpanded(2);
  };

  useEffect(() => {
    reset(educationDetailsState);
  }, [reset, educationDetailsState, setExpanded]);

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
                    xs={12}
                    sm={6}
                    md={4}
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

              {controlledFields.length > 1 && (
                <Grid
                  item
                  xs={4}
                  className="row-center"
                  key={`delete-${index}`}
                >
                  <div>
                    <Tooltip title="Delete Acedemic Detail">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => remove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Grid>
              )}
            </Grid>
          );
        })}

        {isAnyEducationFormAvialable && (
          <Grid container className="row-center my-5">
            <div className="m-2">
              <Button
                variant="contained"
                type="button"
                onClick={() => setExpanded(0)}
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

      <Tooltip title="Add Acedemic Details" placement="left">
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={() =>
            append({
              college: '',
              course_name: '',
              end_year: 2016,
              start_year: 2013,
              university: '',
            })
          }
        ></SpeedDial>
      </Tooltip>
    </div>
  );
};

export default EducationForm;
