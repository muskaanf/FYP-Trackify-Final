import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(8, 'New Password should be of minimum 8 characters length'),
  confirmNewPassword: Yup.string()
    .required('Confirm New Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form values', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4} direction="column" m={2} sx={{ paddingTop: "60px" }}>
        <TextField
          id="oldPassword"
          name="oldPassword"
          label="Old Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ width: '390px', color: '#009193' }}
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <TextField
          id="newPassword"
          name="newPassword"
          label="New Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ width: '390px', color: '#009193' }}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
        />
        <TextField
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          variant="outlined"
          size="small"
          sx={{ width: '390px', color: '#009193' }}
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
          helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
        />
        <Button variant="contained" type="submit" sx={{ width: '390px', background: '#009193' }}>
          Confirm
        </Button>
      </Stack>
    </form>
  );
};

export default ChangePassword;
