import { atomWithStorage } from 'jotai/utils';
import {
  IEducationFields,
  IExperienceFields,
  IUserFields,
} from '../types/resume-model';

export const userDetailsInitialState: IUserFields = {
  about_me: '',
  name: '',
  personal_details: {
    email: '',
    linked_in_profile: '',
    phone: '',
    portfolio_link: '',
  },
  skills: '',
  title: '',
};
export const userDetailsAtomState = atomWithStorage<IUserFields>(
  'userDetailsAtomState',
  userDetailsInitialState
);

export const educationDetailsInitialState: IEducationFields = {
  education: [
    {
      college: '',
      course_name: '',
      end_year: 2016,
      start_year: 2013,
      university: '',
    },
  ],
};
export const educationDetailsAtomState = atomWithStorage<IEducationFields>(
  'educationDetailsAtomState',
  educationDetailsInitialState
);

export const experienceDetailsInitialState: IExperienceFields = {
  experiance: [
    {
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
    },
  ],
};

export const experienceDetailsAtomState = atomWithStorage<IExperienceFields>(
  'experienceDetailsAtomState',
  experienceDetailsInitialState
);
