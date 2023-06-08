import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string().required(),
  title: yup.string().required(),
  about_me: yup.string().required(),
  skills: yup.string().required(),
  personal_details: yup.object().shape({
    phone: yup.string().required('Phone number is required!'),
    email: yup.string().email('Invalid Email!').required('Email is required!'),
    linked_in_profile: yup.string().required('LinkedIn URL is required!'),
    portfolio_link: yup.string(),
  }),
});
