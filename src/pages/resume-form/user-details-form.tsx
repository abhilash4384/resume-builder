// @ts-nocheck

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import userValidationSchema from '../../schemas/user-details.schema';
import { userDetailsAtomState } from '../../store/app-atoms';
import { IFormFields, IUserFields } from '../../types/resume-model';

const userDetailsFormFields: IFormFields[] = [
  { fieldLable: 'Name', fieldName: 'name' },
  { fieldLable: 'Title', fieldName: 'title' },
  {
    fieldLable: 'Skills-React,Javscript,Node',
    fieldName: 'skills',
  },

  {
    fieldLable: 'Phone No',
    fieldName: 'personal_details.phone',

    optionalErrorFieldName: 'phone',
  },
  {
    fieldLable: 'Email',
    fieldName: 'personal_details.email',

    optionalErrorFieldName: 'email',
  },
  {
    fieldLable: 'Linked In URL',
    fieldName: 'personal_details.linked_in_profile',

    optionalErrorFieldName: 'linked_in_profile',
  },
  {
    fieldLable: 'Portfolio Link',
    fieldName: 'personal_details.portfolio_link',
    optionalErrorFieldName: 'portfolio_link',
  },
  { fieldLable: 'About Me', fieldName: 'about_me' },
];

type IFieldNamesType =
  | 'title'
  | 'name'
  | 'skills'
  | 'personal_details.phone'
  | 'personal_details.email'
  | 'personal_details.linked_in_profile'
  | 'personal_details.portfolio_link'
  | 'about_me'
  | 'personal_details';

const UserDetailsForm = ({ setExpanded }: { setExpanded: any }) => {
  const [userDetailsState, setUserDetailsState] = useAtom(userDetailsAtomState);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IUserFields>({
    resolver: yupResolver(userValidationSchema),
  });
  const onSubmit: SubmitHandler<IUserFields> = (data) => {
    setUserDetailsState(data);
    setExpanded(1);
  };

  useEffect(() => {
    reset(userDetailsState);
  }, [reset, userDetailsState]);

  return (
    <div className="mt-5">
      <Grid item xs={12} className="row-center">
        <p className="text-large">User Details</p>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} className="row-center">
          {userDetailsFormFields.map((field) => (
            <Grid
              key={field.fieldName}
              item
              xs={12}
              md={4}
              sm={6}
              className="row-center"
            >
              <div>
                <p className="pl-1 text-bold text-grey">{field.fieldLable}</p>
                <TextField
                  sx={{
                    width: 350,
                  }}
                  variant="filled"
                  size="small"
                  {...register(field.fieldName as IFieldNamesType)}
                />
                <p className="text-error text-capitalize">
                  {errors?.[field.fieldName]?.message ?? ''}
                  {errors?.personal_details?.[field.optionalErrorFieldName]
                    ?.message ?? ''}
                </p>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid container className="row-center mt-5">
          <div className="mx-2">
            <Button variant="contained" type="reset" onClick={() => reset()}>
              Reset
            </Button>
          </div>
          <div className="mx-2">
            <Button variant="contained" type="submit">
              Submit & Next
            </Button>
          </div>
        </Grid>
      </form>
    </div>
  );
};

export default UserDetailsForm;
