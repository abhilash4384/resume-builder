import IResume from '../../types/resume-model';

const defaultReusme: IResume = {
  name: 'John Doe',
  title: 'Software Engineer',
  about_me:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry., Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  skills: 'React, JavaScript, NodeJS, React-Native',
  experiance: [
    {
      company_name: 'Google',
      role_title: 'Associate Software Engineer',
      location: 'Pune, India',
      duration: 'June 2015 - TillDate',
      projects: [
        {
          project_name: 'GChat',
          project_link: 'www.google.com',
          project_link_title: 'GChat',
          technologies_used: 'React, Redux, Typescript, Formik',
          project_description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          project_name: 'GChat',
          project_link: 'www.google.com',
          project_link_title: 'GChat',
          technologies_used: 'React, Redux, Typescript, Formik',
          project_description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
      ],
    },
    {
      company_name: 'Google',
      role_title: 'Associate Software Engineer',
      location: 'Pune, India',
      duration: 'June 2015 - Dec 2017',
      projects: [
        {
          project_name: 'GChat',
          project_link: 'www.google.com',
          project_link_title: 'GChat',
          technologies_used: 'React, Redux, Typescript, Formik',
          project_description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
        {
          project_name: 'GChat',
          project_link: 'www.google.com',
          project_link_title: 'GChat',
          technologies_used: 'React, Redux, Typescript, Formik',
          project_description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        },
      ],
    },
  ],
  education: [
    {
      university: 'Pune University',
      college: 'College of Engineering, Pune',
      course_name: `Bachlor's of Computer Science (BSC)`,
      start_year: 2013,
      end_year: 2015,
    },
    {
      university: 'Pune University',
      college: 'College of Engineering, Pune',
      course_name: `Bachlor's of Computer Science (BSC)`,
      start_year: 2013,
      end_year: 2015,
    },
    {
      university: 'Pune University',
      college: 'College of Engineering, Pune',
      course_name: `Bachlor's of Computer Science (BSC)`,
      start_year: 2013,
      end_year: 2015,
    },
  ],
  personal_details: {
    phone: '+91 99999 99999',
    email: 'example.exe@exe.com',
    linked_in_profile: 'www.sample.test.com',
    portfolio_link: 'www.John.doe.com',
  },
};

export default defaultReusme;
