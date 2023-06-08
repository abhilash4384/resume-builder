import * as yup from 'yup';

export default yup.object().shape({
  experiance: yup.array().of(
    yup.object().shape({
      company_name: yup.string().required('This field is required'),
      role_title: yup.string().required('This field is required'),
      location: yup.string().required('This field is required'),
      duration: yup.string().required('This field is required'),
      projects: yup.array().of(
        yup.object().shape({
          project_name: yup.string().required('This field is required'),
          project_link: yup.string(),
          project_link_title: yup.string(),
          technologies_used: yup.string().required('This field is required'),
          project_description: yup.string().required('This field is required'),
        })
      ),
    })
  ),
});
