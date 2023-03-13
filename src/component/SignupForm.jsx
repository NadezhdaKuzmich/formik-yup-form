import { TextField, Button, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const initalValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className="formWrap">
      <div className="formBox">
        <Typography variant="h4">Sign Up</Typography>

        <Formik
          initialValues={initalValues}
          validationSchema={SignupSchema}
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            formikHelpers.resetForm();
          }}
          // validateOnBlur = { true } // default
          // validateOnChange = { true } // default
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                color="primary"
                autoComplete="off"
                label="Name"
                error={Boolean(errors.name) && Boolean(touched.name)}
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                name="email"
                type="email"
                as={TextField}
                color="primary"
                autoComplete="off"
                label="Email"
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                name="password"
                type="password"
                as={TextField}
                color="primary"
                autoComplete="off"
                label="Password"
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                name="confirmPassword"
                type="password"
                as={TextField}
                color="primary"
                autoComplete="off"
                label="Confirm password"
                error={
                  Boolean(errors.confirmPassword) &&
                  Boolean(touched.confirmPassword)
                }
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isValid || !dirty}
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="imgWrap">
        <img src="./img1.jpg" alt="logo" />
      </div>
    </div>
  );
};

export default SignupForm;