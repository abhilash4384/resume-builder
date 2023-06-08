import * as yup from 'yup';

export default yup.object().shape({
  education: yup.array().of(
    yup.object().shape({
      university: yup.string().required('University name is required'),
      college: yup.string().required('College name is required'),
      course_name: yup.string().required('Course Name is required'),
      start_year: yup.number().required('Start year is required'),
      end_year: yup.number().required('End year required'),
    })
  ),
});
