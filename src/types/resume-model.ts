export interface IFormFields {
  fieldName: string;
  fieldLable: string;
  optionalErrorFieldName?: string;
}

export interface IUserFields {
  name: string;
  title: string;
  about_me: string;
  skills: string;
  personal_details: {
    phone: string;
    email: string;
    linked_in_profile: string;
    portfolio_link?: string;
  };
}

export interface IEducationFields {
  education: {
    university: string;
    college: string;
    course_name: string;
    start_year: number;
    end_year: number;
  }[];
}

export interface IProjects {
  project_name: string;
  project_link?: string;
  project_link_title?: string;
  technologies_used: string;
  project_description: string;
}
export interface IExperienceFields {
  experiance: {
    company_name: string;
    role_title: string;
    location: string;
    duration: string;
    projects: IProjects[];
  }[];
}

export default interface IResume
  extends IUserFields,
    IEducationFields,
    IExperienceFields {}
